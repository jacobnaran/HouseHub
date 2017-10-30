import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import{ AngularFireAuth } from 'angularfire2/auth'
import { TabsPage } from '../tabs/tabs';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  async createAccountAndLogIn(email: string, password: string) {
    // this.alertCtrl.create({
    //   subTitle: user.email+" "+user.password
    // }).present();
    await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    this.afAuth.auth.signInWithEmailAndPassword(email, password);
    this.navCtrl.setRoot(TabsPage);
  }
}
