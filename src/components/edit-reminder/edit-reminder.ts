import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';

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
  notesRef: AngularFireList<any>;
  remKey: string;
  remTime: string;
  remDate: string;

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private authProv: AuthProvider,
              private statusBar: StatusBar,
              public navParams: NavParams) {

    this.remKey = navParams.get('key');
    db.object(`notes-lists/${this.authProv.currentUser.householdKey}/${this.remKey}`).valueChanges().first().subscribe((note) => {
      this.remText = note['text'];
    });
    this.notesRef = this.db.list(`notes-lists/${this.authProv.currentUser.householdKey}`);
  }

  // push reminder to database
  addReminder() {

    var reminderD = this.remDate + 'T' + this.remTime + ':00' + 'Z';
    var d = new Date(reminderD);
    d.setHours(d.getHours()+5);
    console.log(d.getDate());
    var month = d.getMonth() + 1;

    this.notesRef.update(this.remKey, {
      text: this.remText,
      remDate: month + '/' + d.getDate(),
      remTime: this.remTime
    });

    this.dismiss();
  }

  // dismiss page
  dismiss() {
    this.viewCtrl.dismiss();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }
}
