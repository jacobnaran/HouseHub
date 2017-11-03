import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.interface';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  //profile: Observable<User>
  name: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public db: AngularFireDatabase,
              public afAuth: AngularFireAuth,
              public dbProv: DatabaseProvider) {

      // on auth state change, update name
      this.events.subscribe('user:update', () => {
        console.log('event heard (settings)');
        console.log(dbProv.currentUser.name);
        this.name = dbProv.currentUser.name;
      });
  }

  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'About Version 3.1',
        subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat risus purus, eu dignissim turpis maximus vel. Cras non faucibus lorem. Proin luctus, urna in hendrerit aliquet, orci nunc congue nunc, ut pretium enim mauris et turpis. Vestibulum ac arcu vel eros posuere congue in sit amet nibh. Proin rutrum, metus ac varius iaculis, leo dui tempor enim, vel aliquam leo nibh id mi. Phasellus aliquam accumsan elit eu luctus. Donec commodo eget arcu at bibendum. Vivamus id arcu vel massa luctus faucibus.',
        buttons: ['Close']
      });
      alert.present();
    }

    navLogin()
    {
      //this.navCtrl.pop();
      //this.navCtrl.setRoot(LoginPage);
      this.afAuth.auth.signOut();
      this.events.publish('user:logout');

    }

}
