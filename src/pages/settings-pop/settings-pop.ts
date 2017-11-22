import { Component } from '@angular/core';
import { ViewController, NavController, AlertController, Events } from 'ionic-angular';

import { SetupPage } from '../setup/setup';
import { AuthProvider } from '../../providers/database/database';

/**
 * Generated class for the SettingsPopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-pop',
  templateUrl: 'settings-pop.html',
})
export class SettingsPopPage {

  constructor(public viewCtrl: ViewController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private authProv: AuthProvider,
    public events: Events) {
  }

  editName() {
    this.alertCtrl.create({
      title: 'Edit Display Name',
      inputs: [
        {
          name: 'newName',
          value: this.authProv.currentUserName
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.authProv.updateDisplayName(data.newName);
            this.close();
          }
        }
      ]
    }).present();
  }

  navigateToSetupPage() {
    this.navCtrl.push(SetupPage);
    this.close();
  }

  pressDeleteAccount() {

    // prompt for confirmation
    this.alertCtrl.create({
      title: 'Delete account?',
      message: "Are you sure you want to delete your HouseHub account? This action cannot be undone.",
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.confirmDeleteAccount();
          }
        }
      ]
    }).present();
  }

  confirmDeleteAccount() {

    // call method in AuthProvider
    this.authProv.deleteAccount();

    // show confirmation alert
    this.alertCtrl.create({
      title: 'Success',
      message: "Your account has been deleted.",
      buttons: [
        {
          text: 'OK',
        }
      ]
    }).present();

    // navigate to login page
    this.close();
    this.events.publish('user:logout');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
