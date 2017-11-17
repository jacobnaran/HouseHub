import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item.interface';

import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

import { AddItemComponent } from '../../components/add-item/add-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsPage} from '../settings/settings';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listKey: string;
  listType: string = "public";

  //public ionColor: string = 'primary';
  itemsRef: AngularFireList<any>
  items: Observable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private db: AngularFireDatabase,
              public events: Events,
              public alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              public dbProv: DatabaseProvider) {

    this.updateList();

    // on user update, update list
    events.subscribe('user:update', () => {
      this.updateList();
    });
  }


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

  clickFab() {
    document.getElementById("home-fab").click();
  }

  showAddItem() {
    //this.updateListKey();
    let modal = this.modalCtrl.create(AddItemComponent, {listPath: `shopping-lists/${this.listKey}`});
    modal.present();
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  updateListKey() {
    this.listKey = (this.listType=="public" ? this.dbProv.currentUser.householdKey : this.dbProv.currentUser.privateKey);
    //console.log(this.listKey);
  }

  updateList() {
    this.updateListKey();
    this.itemsRef = this.db.list(`shopping-lists/${this.listKey}`);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
