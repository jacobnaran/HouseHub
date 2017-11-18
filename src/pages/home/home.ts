import { Component } from '@angular/core';
import { Events, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { SettingsPage } from '../settings/settings';
import { DatabaseProvider } from '../../providers/database/database';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { AddNoteComponent } from '../../components/add-note/add-note';
import { AddReminderComponent } from '../../components/add-reminder/add-reminder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // keeps track of whether the fab is clicked
  fabOpened: boolean = false;
  buttonClick: boolean = false;

  notesRef: AngularFireList<any>
  notes: Observable<any[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public db: AngularFireDatabase,
              public dbProv: DatabaseProvider,
              private statusBar: StatusBar) {
    events.subscribe('tab:selected', () => {
      this.closeFab();
    });

    this.updateList();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');

    // on user update, update list
    events.subscribe('user:update', () => {
      this.updateList();
    });
  }

  updateList() {
    this.notesRef = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`, ref => ref.orderByChild('timestamp'));
    this.notes = this.notesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  showAlert(text) {
    let alert = this.alertCtrl.create({
      //title: text,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();

  }

  settingsNav()
  {
    this.navCtrl.push(SettingsPage);
  }

  toggleFab() {
    if (this.fabOpened) {
      this.fabOpened = false;
    }
    else {
      this.fabOpened = true;
    }
  }

  clickFab() {
    document.getElementById("home-fab").click();
  }

  closeFab() {
    if (this.fabOpened) {
      this.clickFab();
    }
  }

  showAddNote() {
    let modal = this.modalCtrl.create(AddNoteComponent);
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  showAddReminder() {
    let modal = this.modalCtrl.create(AddReminderComponent);
    modal.present();
    this.closeFab();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  deleteNote(key: string) {
    this.notesRef.remove(key);
  }
}
