import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, ModalController, NavController, NavParams, Events } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AddIvnItemComponent } from '../../components/add-ivn-item/add-ivn-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { InventoryItem } from '../../models/inventory-item.interface';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { SettingsPage} from '../settings/settings';
import { EditInvItemComponent } from '../../components/edit-inv-item/edit-inv-item';
import { AuthProvider } from '../../providers/database/database';


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

  itemsRef: AngularFireList<any>
  items: Observable<InventoryItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public events: Events,
              private db: AngularFireDatabase,
              public modalCtrl: ModalController,
              private statusBar: StatusBar,
              public localNotifications: LocalNotifications,
              private authProv: AuthProvider) {


    this.authProv.userUpdates.subscribe(() => {
      this.updateList();
    });

    events.subscribe('tab:selected', () => {
      this.closeFab();
    });


  }

  updateList() {
    this.itemsRef = this.db.list(`inventory-lists/${this.authProv.currentUser.householdKey}`);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

ionViewDidLoad()
{
  this.statusBar.overlaysWebView(true);
  this.statusBar.backgroundColorByHexString('#93A3BC');
}

  settingsNav()
  {
    this.navCtrl.push(SettingsPage);
  }

 showAlert() {
     let alert = this.alertCtrl.create({
       title: 'Adding new tab',
       subTitle: 'Please fill up your current inventory before adding a new tab',
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
   this.closeFab();

   this.statusBar.overlaysWebView(true);
   this.statusBar.backgroundColorByHexString('#222');
 }

 showEditItem(key: string) {
   let modal = this.modalCtrl.create(EditInvItemComponent, {key: key});
   modal.present();
   this.closeFab();

   this.statusBar.overlaysWebView(true);
   this.statusBar.backgroundColorByHexString('#222');
 }

 deleteItem(key: string) {
   this.itemsRef.remove(key);

   this.localNotifications.schedule({
     id: 1,
     text: 'Deleted inv item',
     //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
     data: { secret: key }
   });


 }

}
