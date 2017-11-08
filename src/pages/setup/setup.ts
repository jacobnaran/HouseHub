import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../models/user.interface';

import { TabsPage } from '../tabs/tabs';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import{ AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the SetupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  user: User;
  //currentUserId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase,
              //public afAuth: AngularFireAuth,
              public dbProv: DatabaseProvider) {
    this.user = navParams.get('user');
    // this.afAuth.authState.subscribe(auth => {
    //   this.currentUserId = auth.uid;
    // })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetupPage');
  }

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

  createHousehold(title: string) {
    // create new household key and store in user profile
    let hhKey = this.db.list('households').push(null).key;
    this.db.object(`households/${hhKey}/name`).set(title);
    this.user.householdKey = hhKey;

    // update user profile
    //this.db.object(`users/${this.currentUserId}`).set(this.user);
    this.db.object(`users/${this.dbProv.currentUserId}`).set(this.user);

    // navigate to home page
    this.navCtrl.setRoot(TabsPage);
  }

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

  joinHousehold(id: string) {
    // create new household key and store in user profile
    let hhKey = id;
    this.user.householdKey = hhKey;

    // update user profile
    //this.db.object(`users/${this.currentUserId}`).set(this.user);
    this.db.object(`users/${this.dbProv.currentUserId}`).set(this.user);
      // this should automatically update the currentUser object?

    // navigate to home page
    this.navCtrl.setRoot(TabsPage);
  }
}
