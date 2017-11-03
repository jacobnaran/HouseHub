import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SettingsPage } from '../settings/settings';
import { DatabaseProvider } from '../../providers/database/database';
import { AddNoteComponent } from '../../components/add-note/add-note';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  // keeps track of whether the fab is clicked
  fabOpened: boolean = false;

  // database reference objects
  notesRef: AngularFireList<any>
  notes: Observable<any[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public db: AngularFireDatabase,
              public dbProv: DatabaseProvider) {

    // close fab upon tab select
    events.subscribe('tab:selected', () => {
      this.closeFab();
    });

    // update database reference on construct
    this.updateList();

    // update database reference on user update (login)
    events.subscribe('user:update', () => {
      this.updateList();
    });
  }

  // update database reference for current user
  updateList() {
    this.notesRef = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`, ref => ref.orderByChild('timestamp'));
    this.notes = this.notesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Card deleted',
        //subTitle: '',
        buttons: ['OK']
      });
      alert.present();

    }

  // open the settings page
  openSettings()
  {
    this.navCtrl.push(SettingsPage);
  }

  // toggle the fabOpened variable
  toggleFab() {
    if (this.fabOpened) {
      this.fabOpened = false;
    }
    else {
      this.fabOpened = true;
    }
  }

  // click the fab
  clickFab() {
    document.getElementById("home-fab").click();
  }

  // close the fab
  closeFab() {
    if (this.fabOpened) {
      this.clickFab();
    }
  }

  // open the add-note modal and close the fab
  showAddNote() {
    let modal = this.modalCtrl.create(AddNoteComponent);
    modal.present();
    this.closeFab();
  }

  // delete the selected note
  deleteNote(key: string) {
    this.notesRef.remove(key);
  }

}
