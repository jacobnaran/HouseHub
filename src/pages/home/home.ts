import { Component } from '@angular/core';
import { Events, IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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

  notesRef: AngularFireList<any>
  notes: Observable<any[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public events: Events,
              public alertCtrl: AlertController,
              public modalCtrl: ModalController,
              public db: AngularFireDatabase,
              public dbProv: DatabaseProvider,
              public afAuth: AngularFireAuth) {
    events.subscribe('tab:selected', () => {
      this.closeFab();
    });

    this.updateList();

    // on user update, update list
    events.subscribe('user:update', () => {
      this.updateList();
    });

    // this.notesRef = db.list(`notes-list/${dbProv.currentUser.householdKey}`, ref => ref.orderByChild('timestamp'));
    // this.notes = this.notesRef.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }

  updateList() {
    this.notesRef = this.db.list(`notes-lists/${this.dbProv.currentUser.householdKey}`, ref => ref.orderByChild('timestamp'));
    this.notes = this.notesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // ionViewDidLoad() {
  //    this.events.publish('tab:opened', 'home');
  // }
  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Card deleted',
        //subTitle: '',
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
  }

  deleteNote(key: string) {
    this.notesRef.remove(key);
  }

}
