import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';

/**
* Login page.
*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string = '';
  password: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public authProv: AuthProvider,
              private statusBar: StatusBar) {

  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }

  // navigate to register page
  navigateToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  // error message
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter a valid email and password.',
      buttons: ['Ok']
    });
    alert.present();

  }

  // sign in as a guest (mainly for testing)
  signInAsGuest() {
    var that = this;
    this.authProv.emailLogin('guest@househub.com', 'password');
    setTimeout(function() {
      that.navCtrl.setRoot(TabsPage);
    }, 750);

  }

  // sign in as a previously registered user
  signIn()
  {
    var that = this;
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function() {
      that.navCtrl.setRoot(TabsPage);
    }, function() {
      that.showAlert();
    });
  }

}
