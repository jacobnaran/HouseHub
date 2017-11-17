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

  text: string;

  constructor(public viewCtrl: ViewController) {

  }
  public event = {
      month: '1990-02-19',
      timeStarts: '07:43',
      timeEnds: '1990-02-20'
    }

    dismiss() {
      // this.note = {}
      this.viewCtrl.dismiss();
    }


}
