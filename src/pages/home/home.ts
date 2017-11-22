import { Component } from '@angular/core';
import { Events, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { SettingsPage } from '../settings/settings';
import { AuthProvider } from '../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { EditNoteComponent } from '../../components/edit-note/edit-note';
import { AddNoteComponent } from '../../components/add-note/add-note';
import { AddReminderComponent } from '../../components/add-reminder/add-reminder';
import { EditReminderComponent } from '../../components/edit-reminder/edit-reminder';

/**
 * Home page (middle tab). Displays shared notes.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  fabOpened: boolean = false; // keeps track of whether the fab is toggled

  notesRef: AngularFireList<any>
  notes: Observable<any[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public db: AngularFireDatabase,
              public authProv: AuthProvider,
              private statusBar: StatusBar) {

    // close fab on tab change
    events.subscribe('tab:selected', () => {
      this.closeFab();
    });

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');

    // update database reference when user logs in
    this.updateList();
    // events.subscribe('user:update', () => {
    //   this.updateList();
    // });
  }

  // update database reference
  updateList() {
    this.notesRef = this.db.list(`notes-lists/${this.authProv.currentUser.householdKey}`, ref => ref.orderByChild('timestamp'));
    this.notes = this.notesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // navigate to settings page
  settingsNav()
  {
    this.navCtrl.push(SettingsPage);
  }

  // toggle button
  toggleFab() {
    if (this.fabOpened) {
      this.fabOpened = false;
    }
    else {
      this.fabOpened = true;
    }
  }

  // click button
  clickFab() {
    document.getElementById("home-fab").click();
  }

  // close overlay
  closeFab() {
    if (this.fabOpened) {
      this.clickFab();
    }
  }

  // show add-note page
  showAddNote() {
    let modal = this.modalCtrl.create(AddNoteComponent);
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  editRemNote(id,key)
  {
    if(id == 'Note')
    {
      this.showEditNote(key);
    }else if(id == 'Reminder')
    {
      this.showEditReminder(key);
    }
  }
  // show edit-note page
  showEditNote(key: string) {
    let modal = this.modalCtrl.create(EditNoteComponent, {key: key});
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  showEditReminder(key: string) {
    let modal = this.modalCtrl.create(EditReminderComponent, {key: key});
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  // show add-reminder page
  showAddReminder() {
    let modal = this.modalCtrl.create(AddReminderComponent);
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  // delete note
  deleteNote(key: string) {
    this.notesRef.remove(key);
  }
}
