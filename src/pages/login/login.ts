import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
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
              public dbProv: DatabaseProvider) {
  }

  ionViewDidLoad() {
    // if (this.dbProv.authenticated) {
    //   this.navCtrl.setRoot(TabsPage);
    // }
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
    this.dbProv.emailLogin('guest@househub.com', 'password');
    this.navCtrl.setRoot(TabsPage);
  }

  signIn()
  {
    //this.showAlert(this.email,this.password);
    if(this.email != undefined && this.password != undefined)
    {
      var that = this;
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function(){
        // how do i do this asynchronously
        that.dbProv.updateUserObject();
        that.navCtrl.setRoot(TabsPage);
      },function(){
        that.showAlert();
      });
    } else {
    this.showAlert();
    }
  }



}
