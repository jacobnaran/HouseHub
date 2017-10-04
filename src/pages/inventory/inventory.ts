import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public events: Events) {
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

}
