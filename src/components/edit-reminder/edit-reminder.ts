import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the EditReminderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-reminder',
  templateUrl: 'edit-reminder.html'
})
export class EditReminderComponent {

  remText: string;
  addRemRef$: AngularFireList<any>;
  remKey: string;
  remRef: Subscription;
  remTime: string;
  remDate: string;
  origTime: string;

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider,
              private statusBar: StatusBar,
              public navParams: NavParams) {

    this.remKey = navParams.get('key');
    this.remRef = db.object(`notes-lists/${this.dbProv.currentUser.householdKey}/${this.remKey}`).valueChanges().subscribe((note) => {
      this.remText = note['text'];
      this.origTime = note['timestamp'];
    });
    this.addRemRef$ = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`);
  }

  // push reminder to database
  addReminder() {

    var reminderD = this.remDate + 'T' + this.remTime + ':00' + 'Z';
    var d = new Date(reminderD);
    d.setHours(d.getHours()+5);
    console.log(d.getDate());
    var month = d.getMonth() + 1;
    //this.showAlert(d);

    this.addRemRef$.update(this.remKey, {
      id: 'Reminder',
      text: this.remText,
      timestamp: this.origTime,//-1 * Date.now(),
      remDate: month + '/' + d.getDate(),
      remTime: this.remTime
    });

    this.dismiss();
  }

  // dismiss page
  dismiss() {
    // this.note = {}
    this.viewCtrl.dismiss();
    this.remRef.unsubscribe();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }
}
