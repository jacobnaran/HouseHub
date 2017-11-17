import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
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
  password: string;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private dbProv: DatabaseProvider) {
  }

  // create account, log in, and navigate to setup page
  async createAccountAndLogIn() {
    try {
      await this.dbProv.emailSignUp(this.user, this.password);
      this.password = '';
      this.navCtrl.setRoot(SetupPage, {user: this.user});
    }
    catch (e) {
      console.error(e);
    }
  }
}
