import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddNoteComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-note',
  templateUrl: 'add-note.html'
})
export class AddNoteComponent {

  noteText: string
  addNoteRef$: AngularFireList<any>

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase) {
    this.addNoteRef$ = this.db.list('notes-list');
  }

  addNote() {
    this.addNoteRef$.push({
      text: this.noteText
    });

    this.dismiss();
  }

  dismiss() {
    // this.note = {}
    this.viewCtrl.dismiss();
  }

}
