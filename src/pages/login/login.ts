import { Component } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth,
              public alertCtrl: AlertController,
              public dbProv: DatabaseProvider,
              private statusBar: StatusBar) {

  }

  ionViewDidLoad() {
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }

  navigateToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Please enter a valid email id and password',
      buttons: ['Ok']
    });
    alert.present();

  }

  signInAsGuest() {
    var that = this;
    this.dbProv.emailLogin('guest@househub.com', 'password');
    setTimeout(function() {
      that.navCtrl.setRoot(TabsPage);
    }, 750);

  }

  signIn()
  {
    if(this.email != undefined && this.password != undefined)
    {
      var that = this;
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function() {
        //that.dbProv.updateUserRef();
        that.navCtrl.setRoot(TabsPage);
      },function(){
        that.showAlert();
      });
    } else {
    this.showAlert();
    }
  }

}
