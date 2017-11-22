import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { User } from '../../models/user.interface';

import { TabsPage } from '../tabs/tabs';

import { Subscription } from 'rxjs/Subscription';

import { AngularFireDatabase } from 'angularfire2/database';
import { AuthProvider } from '../../providers/database/database';


/**
 * Setup page. Allows a newly registered user to choose between creating a new
 * household and joining one. Note: if the user closes the app from this page,
 * (I think) they are added to the household with ID 'nullhouseholdkey'.
 */


@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  checker: Subscription;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase,
              public authProv: AuthProvider) {
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
    this.db.object(`households/${key}/members/${this.authProv.currentUserId}`).set(this.authProv.currentUserName);


    // update user profile
    this.db.object(`users/${this.authProv.currentUserId}`).update({ householdKey: key });

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
