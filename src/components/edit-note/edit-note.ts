import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Page to edit a note on the home page.
 */

@Component({
  selector: 'edit-note',
  templateUrl: 'edit-note.html'
})
export class EditNoteComponent {

  noteText: string;
  notesRef: AngularFireList<any>;
  noteKey: string;

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider,
              private statusBar: StatusBar,
              public navParams: NavParams) {

    this.noteKey = navParams.get('key');
    db.object(`notes-lists/${this.dbProv.currentUser.householdKey}/${this.noteKey}`).valueChanges().first().subscribe((note) => {
      this.noteText = note['text'];
    });
    this.notesRef = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`);
  }

  // push note to database
  addNote() {
    this.notesRef.update(this.noteKey, {
      text: this.noteText
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
