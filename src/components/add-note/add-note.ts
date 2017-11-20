import { Component } from '@angular/core';
import { ViewController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Page to add a note to the home page.
 */
@Component({
  selector: 'add-note',
  templateUrl: 'add-note.html'
})
export class AddNoteComponent {

  noteText: string
  addNoteRef$: AngularFireList<any>

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider,
              public events: Events,
              private statusBar: StatusBar) {

    // database reference
    this.addNoteRef$ = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`);
  }

  // push note to database
  addNote() {
    this.addNoteRef$.push({
      id: 'Note',
      text: this.noteText,
      timestamp: -1 * Date.now()
    });

    this.dismiss();
  }

  // dismiss page
  dismiss() {
    // this.note = {}
    this.viewCtrl.dismiss();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }

}
