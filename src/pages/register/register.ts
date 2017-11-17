import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { SetupPage } from '../setup/setup';
import { User } from '../../models/user.interface';

/*
 * This page allows a user to register an account to HouseHub.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;  // user object

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider) {
  }

  // create account, log in, and navigate to setup page
  async createAccountAndLogIn(email: string, password: string) {
    try {
      await this.dbProv.emailSignUp(email, password, this.user);
      this.navCtrl.setRoot(SetupPage, {user: this.user});
    }
    catch (e) {
      console.error(e);
    }
  }
}
