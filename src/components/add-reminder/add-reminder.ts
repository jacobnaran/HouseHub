import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';

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
  remDate: string = '2017-11-19';
  remTime: string = '12:00';

  addRemRef$: AngularFireList<any>

  constructor(public viewCtrl: ViewController, private dbProv: DatabaseProvider, private db: AngularFireDatabase) {
    this.addRemRef$ = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`);
  }

  done() {
    this.addRemRef$.push({
      text: this.remTitle,
      timestamp: -1 * Date.now(),
      remDate: this.remDate,
      remTime: this.remTime
    });
    this.viewCtrl.dismiss();
  }


}
