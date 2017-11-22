import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.interface';

import { TabsPage } from '../tabs/tabs';

import { Subscription } from 'rxjs/Subscription';

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
  checker: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase,
              public dbProv: DatabaseProvider) {

    // fetch user object from NavParams
    this.user = navParams.get('user');
  }

  // display dialog box for creating household
  create() {
    this.alertCtrl.create({
      title: 'Create New Household',
      message: "Enter a unique household ID:",
      inputs: [
        {
          name: 'id',
          placeholder: 'e.g. \'302douglas\''
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.checkHouseholdId(data.id, 'create');
          }
        }
      ]
    }).present();
  }

  // check whether a household ID is in use and proceed accordingly
  checkHouseholdId(key: string, action: string) {
    // initialize boolean flag
    var exists = false;

    this.checker = this.db.list(`households/${key}`).valueChanges().first().subscribe(() => {
      // ID exists
      exists = true;

      // show error if user wants to create and ID exists
      if (action=='create') {
        this.showError(`The ID \'${key}\' is already in use.`);
      }

      // proceed if user wants to join and ID exists
      if (action=='join') {
        this.createOrJoinHousehold(key);
      }
    });

    var that = this;  // workaround (scope issue)

    // perform this if ID has not been found after 500 milliseconds
    setTimeout(function() {
      if (!exists) {

        // unsubscribe from 'checker' observable
        that.checker.unsubscribe();

        // proceed if user wants to create and ID doesn't exist
        if (action=='create') {
          that.createOrJoinHousehold(key);
        }

        // show error if user wants to join and ID doesn't exist
        if (action=='join') {
          that.showError(`No household with ID \'${key}\' was found.`);
        }
      }
    }, 500);  // may need to change later
  }

  // create household with given key
  createOrJoinHousehold(key: string) {

    // add user to list of household members
    this.db.object(`households/${key}/members/${this.dbProv.currentUserId}`).set(this.user.name);


    // update user profile (we can change this to update)
    this.user.householdKey = key;
    this.db.object(`users/${this.dbProv.currentUserId}`).set(this.user);

    // navigate to home page
    this.done();
  }

  // display dialog box for joining household
  join() {
    this.alertCtrl.create({
      title: 'Join Existing Household',
      message: "Enter the household ID:",
      inputs: [
        {
          name: 'id',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          handler: data => {
            this.checkHouseholdId(data.id, 'join');
          }
        }
      ]
    }).present();
  }

  // error message
  showError(message: string) {
    this.alertCtrl.create({
      title: 'Error',
      message: message,
      buttons: [
        {
          text: 'OK',
        }
      ]
    }).present();
  }

  // navigate to home page
  done() {
    this.navCtrl.setRoot(TabsPage);
  }
}
