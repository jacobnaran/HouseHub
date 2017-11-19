import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Settings page. Displays log-out button, current user, household name, and household key.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public dbProv: DatabaseProvider) {
  }

  // 'About' page
  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'About Version 3.1',
        subTitle: 'HouseHub allows users of a common living space to easily share information on household matters. With shopping lists, inventories, notes, and reminders, we aim to improve the headspace of our users by simplifying the management of domestic living.',
        message: 'Developed by Bart Martinon, Jacob Naranjo, Skyler Norgaard and Tanush Samson',
        buttons: ['Close']
      });
      alert.present();
    }

    // Log out
    logOut()
    {
      this.dbProv.signOut();

      // publish event for global function in app.component.ts
      this.events.publish('user:logout');

    }

}
