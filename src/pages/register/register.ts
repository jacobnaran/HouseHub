import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { TabsPage } from '../tabs/tabs';
import { SetupPage } from '../setup/setup';
import { User } from '../../models/user.interface';

/*
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;
  //userId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              //public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

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
