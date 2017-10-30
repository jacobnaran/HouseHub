import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { SettingsPage} from '../settings/settings';

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
              public db: AngularFireDatabase) {
    events.subscribe('tab:selected', () => {
      this.closeFab();
    });

    this.notesRef = db.list('notes-list', ref => ref.orderByChild('timestamp'));
    this.notes = this.notesRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }

  // ionViewDidLoad() {
  //    this.events.publish('tab:opened', 'home');
  // }
  showAlert() {
      let alert = this.alertCtrl.create({
        title: 'Hi',
        subTitle: 'Something isnt working so we put an alert here',
        buttons: ['OK :(']
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

  cardClick(){
    let alert = this.alertCtrl.create({
      title: 'NO SOCIAL MEDIA FOR YOU',
      subTitle: 'Social networks are massively addictive.',
      buttons: ['OK']
    });
    alert.present();
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
