import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, private dbProv: DatabaseProvider) {
    var that = this;
    // timeout needed because it takes a while for dbProv to grab authState
    setTimeout(function() {
      if (that.dbProv.authenticated) {
        that.navCtrl.setRoot(TabsPage);
      }
      else {
        that.navCtrl.setRoot(LoginPage);
      }
    }, 3000);
  }

}
