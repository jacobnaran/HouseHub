import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.interface';

import { TabsPage } from '../tabs/tabs';

import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Setup page. Allows new user to choose between creating a new household and joining one.
 */

@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  user: User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase,
              public dbProv: DatabaseProvider) {

    // fetch user object from NavParams
    this.user = navParams.get('user');
  }

  // dialog box for creating household
  create() {
    let prompt = this.alertCtrl.create({
      title: 'New Household',
      message: "Enter a household name:",
      inputs: [
        {
          name: 'title',
          placeholder: 'e.g. \'123 Elm Street\''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.createHousehold(data.title);
          }
        }
      ]
    });
    prompt.present();
  }

  // create household with randomly generated key
  createHousehold(title: string) {
    // create new household key and store in user profile
    let hhKey = this.db.list('households').push(null).key;
    this.db.object(`households/${hhKey}/name`).set(title);
    this.db.list(`households/${hhKey}/members`).push(this.user.name);
    this.user.householdKey = hhKey;

    // update user profile
    //this.db.object(`users/${this.currentUserId}`).set(this.user);
    this.db.object(`users/${this.dbProv.currentUserId}`).set(this.user);

    // navigate to home page
    this.navCtrl.setRoot(TabsPage);
  }

  // dialog box for joining household
  join() {
    let prompt = this.alertCtrl.create({
      title: 'Existing Household',
      message: "Enter the unique household ID (in the settings page):",
      inputs: [
        {
          name: 'id',
          placeholder: 'e.g. -Kxju0ae_6jb-ygcfExJ'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'OK',
          handler: data => {
            this.joinHousehold(data.id);
          }
        }
      ]
    });
    prompt.present();
  }

  // join household with shareable key
  joinHousehold(id: string) {

    // create new household key and store in user profile
    let hhKey = id;
    this.user.householdKey = hhKey;

    // push user profile to database
    this.db.object(`users/${this.dbProv.currentUserId}`).set(this.user);
      // this should automatically update the currentUser object?

    // add user to list of users of that households
    this.db.list(`households/${hhKey}/members`).push(this.user.name);

    // navigate to home page
    this.navCtrl.setRoot(TabsPage);
  }
}
