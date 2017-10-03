import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // keeps track of whether the fab is clicked
  fabOpened: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    events.subscribe('tab:opened', data => {
      this.closeFab();
    });
  }

  // ionViewDidLoad() {
  //    this.events.publish('tab:opened', 'home');
  // }

  toggleFab() {
    if (this.fabOpened) {
      this.fabOpened = false;
    }
    else {
      this.fabOpened = true;
    }
  }

  clickFab() {
    document.getElementById("home-fab").click();
  }

  closeFab() {
    if (this.fabOpened) {
      this.clickFab();
    }
  }

}
