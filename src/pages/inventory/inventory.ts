import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  fabButtonOpened: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
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

   openFabButton(){
     if(this.fabButtonOpened==false){
         this.fabButtonOpened=true;
     }else{
         this.fabButtonOpened=false;
     }
   }



}
