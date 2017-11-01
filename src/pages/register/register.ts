import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{ AngularFireDatabase } from 'angularfire2/database';
import{ AngularFireAuth } from 'angularfire2/auth';
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
  userId: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public db: AngularFireDatabase) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async createAccountAndLogIn(email: string, password: string) {
    // this.alertCtrl.create({
    //   subTitle: user.email+" "+user.password
    // }).present();
    try {
      await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.user.privateKey = this.db.list('shopping-lists').push(null).key;
      this.afAuth.authState.subscribe(auth => {
        this.userId = auth.uid;
        this.db.object(`users/${this.userId}`).set(this.user);
        this.navCtrl.setRoot(SetupPage, {user: this.user});
      })
    }
    catch (e) {
      console.error(e);
    }
  }
}
