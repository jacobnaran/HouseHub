import { Component } from '@angular/core';
import { ViewController, Events, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/database/database';
import { LocalNotifications } from '@ionic-native/local-notifications';

/**
 * Generated class for the AddReminderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-reminder',
  templateUrl: 'add-reminder.html'
})
export class AddReminderComponent {

  remTitle: string;
  remDate: string = '2017-11-20';
  remTime: string = '12:00';

  addRemRef$: AngularFireList<any>

  constructor(public viewCtrl: ViewController, private authProv: AuthProvider, private db: AngularFireDatabase, public statusBar: StatusBar, public alertCtrl: AlertController, public localNotifications: LocalNotifications) {
    //this.remTime = this.calculateTime('-5');
    this.addRemRef$ = this.db.list(`notes-lists/${this.authProv.currentUser.householdKey}`);
  }

  done() {


    var reminderD = this.remDate + 'T' + this.remTime + ':00' + 'Z';
    var d = new Date(reminderD);
    d.setHours(d.getHours()+5);
    console.log(d.getDate());
    var month = d.getMonth() + 1;
    //this.showAlert(d);

    this.addRemRef$.push({
      id: 'Reminder',
      text: this.remTitle,
      timestamp: -1 * Date.now(),
      remDate: month + '/' + d.getDate(),
      remTime: this.remTime
    });

    this.localNotifications.schedule({
       text: 'Your reminder titled "' + this.remTitle + '" is now active.',
       at: d,
       led: 'FF0000',
       sound: null
       });

    this.viewCtrl.dismiss();
  }

  // calculateTime(offset: any) {
  //     // create Date object for current location
  //     let d = new Date();
  //
  //     // create new Date object for different city
  //     // using supplied offset
  //     let nd = new Date(d.getTime() + (3600000 * offset));
  //
  //     return nd.toISOString();
  //   }

showAlert(text) {
    let alert = this.alertCtrl.create({
      title: text,
      subTitle: text,
      buttons: ['Close']
    });
    alert.present();
  }

  dismiss() {

    this.viewCtrl.dismiss();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');


  }
}
