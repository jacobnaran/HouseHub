import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
import { Subscription } from 'rxjs/Subscription';

/**
 * Page to edit a note on the home page.
 */

@Component({
  selector: 'edit-note',
  templateUrl: 'edit-note.html'
})
export class EditNoteComponent {

  noteText: string;
  addNoteRef$: AngularFireList<any>;
  noteKey: string;
  noteRef: Subscription;

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider,
              private statusBar: StatusBar,
              public navParams: NavParams) {

    this.noteKey = navParams.get('key');
    this.noteRef = db.object(`notes-lists/${this.dbProv.currentUser.householdKey}/${this.noteKey}`).valueChanges().subscribe((note) => {
      this.noteText = note['text'];
    });
    this.addNoteRef$ = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`);
  }

  // push note to database
  addNote() {
    this.addNoteRef$.update(this.noteKey, {
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
    this.noteRef.unsubscribe();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }

}
