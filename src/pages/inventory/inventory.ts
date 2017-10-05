import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, ModalController, NavController, NavParams, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AddIvnItemComponent } from '../../components/add-ivn-item/add-ivn-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { InventoryItem } from '../../models/inventory-item.interface';


/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  fabOpened: boolean = false;

  itemsRef: AngularFireList<InventoryItem>
  items: Observable<InventoryItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public events: Events,
              private db: AngularFireDatabase,
              public modalCtrl: ModalController) {

                this.itemsRef = db.list('inventory-list');
                this.items = this.itemsRef.valueChanges();

    events.subscribe('tab:opened', data => {
      this.closeFab();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }


 showAlert() {
     let alert = this.alertCtrl.create({
       title: 'NO SOCIAL MEDIA FOR YOU',
       subTitle: 'Social networks are massively addictive.',
       buttons: ['OK']
     });
     alert.present();
   }

 toggleFab() {
   if(this.fabOpened) {
       this.fabOpened = false;
   }
   else {
       this.fabOpened = true;
   }
 }

 clickFab() {
   document.getElementById("inv-fab").click();
 }

 closeFab() {
   if (this.fabOpened) {
     this.clickFab();
   }
 }

 showAddItem() {
   let modal = this.modalCtrl.create(AddIvnItemComponent);
   modal.present();
 }

}
