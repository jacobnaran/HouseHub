import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  overlayHidden: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }

  toggleOverlay() {
    if (this.overlayHidden) {
      this.overlayHidden = false;
    }
    else {
      this.overlayHidden = true;
    }
  }

  cardClick(){
    let alert = this.alertCtrl.create({
      title: 'NO SOCIAL MEDIA FOR YOU',
      subTitle: 'Social networks are massively addictive.',
      buttons: ['OK']
    });
    alert.present();
  }

  clickFab() {
    var f1 = document.getElementById("fab");
    f1.click();
  }

}
