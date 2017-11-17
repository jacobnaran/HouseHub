import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public dbProv: DatabaseProvider) {
  }

  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'About Version 3.1',
        subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam feugiat risus purus, eu dignissim turpis maximus vel. Cras non faucibus lorem. Proin luctus, urna in hendrerit aliquet, orci nunc congue nunc, ut pretium enim mauris et turpis. Vestibulum ac arcu vel eros posuere congue in sit amet nibh. Proin rutrum, metus ac varius iaculis, leo dui tempor enim, vel aliquam leo nibh id mi. Phasellus aliquam accumsan elit eu luctus. Donec commodo eget arcu at bibendum. Vivamus id arcu vel massa luctus faucibus.',
        buttons: ['Close']
      });
      alert.present();
    }

    logOut()
    {
      this.dbProv.signOut();

      // publish event for global function in app.component.ts
      this.events.publish('user:logout');

    }

}
