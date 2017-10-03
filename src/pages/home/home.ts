import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  overlayHidden: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad HomePage');
  // }

  hideOverlay() {
    this.overlayHidden = true;
  }

  showOverlay() {
    this.overlayHidden = false;
  }

}
