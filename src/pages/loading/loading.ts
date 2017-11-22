import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/database/database';

import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';

/**
 * Loading page. Here the app decides whether to navigate to the login page or home page.
 */

@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {

  constructor(public navCtrl: NavController, private authProv: AuthProvider) {

    // timeout needed because it takes a while for authProv to grab authState
    var that = this;
    setTimeout(function() {
      
      // navigate to correct page
      if (that.authProv.authenticated) {
        that.navCtrl.setRoot(TabsPage);
      }
      else {
        that.navCtrl.setRoot(LoginPage);
      }
    }, 3000); // 3-second delay for AuthProvider to fetch auth state
  }

}
