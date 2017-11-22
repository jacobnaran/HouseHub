import { Component } from '@angular/core';
import { ViewController, NavController, AlertController } from 'ionic-angular';

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
    private authProv: AuthProvider) {
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

  close() {
    this.viewCtrl.dismiss();
  }

}
