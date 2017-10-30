import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

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
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  navigateToRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Please enter a valid email id and password',
        buttons: ['Ok']
      });
      alert.present();

    }

  signIn()
  {
    //this.showAlert(this.email,this.password);
    if(this.email != undefined && this.password != undefined)
    {
      var that = this;
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function(){that.navCtrl.setRoot(TabsPage);},function(){that.showAlert();});
    } else {
    this.showAlert();
    }
  }



}
