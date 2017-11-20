import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Settings page. Displays log-out button, current user, household name, and household key.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  members: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public dbProv: DatabaseProvider,
              public db: AngularFireDatabase) {
      this.members = this.db.list(`households/${dbProv.currentUser.householdKey}/members`).valueChanges();
  }

  // 'About' page
  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'About Version 3.7',
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

    // Log out
    deleteAcct()
    {
      this.alertCtrl.create({
        title: 'Delete account',
        message: "Are you sure you want to delete your HouseHub account? This action cannot be undone.",
        buttons: [
          {
            text: 'Cancel',
          },
          {
            text: 'OK',
            handler: data => {
              this.alertCtrl.create({
                title: 'Error',
                message: "Sorry, this function has not been implemented yet.",
                buttons: [
                  {
                    text: 'OK',
                  }
                ]
              }).present();
            }
          }
        ]
      }).present();

      //this.dbProv.deleteUser();
      //this.events.publish('user:logout');

    }

}
