import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { NavController, ModalController, NavParams, Events } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item.interface';

import { Observable } from 'rxjs/Observable';

import { AddItemComponent } from '../../components/add-item/add-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { SettingsPage } from '../settings/settings';
import { AuthProvider } from '../../providers/database/database';

/**
* Displays public or private shopping list. FAB allows user to add an item. Dropdown menu changes between private and public.
*/

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listKey: string;
  listType: string = "public";

  itemsRef: AngularFireList<any>
  items: Observable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private db: AngularFireDatabase,
              public events: Events,
              public alertCtrl: AlertController,
              public authProv: AuthProvider,
              private statusBar: StatusBar) {

    this.authProv.userUpdates.subscribe(() => {
      this.updateList();
    });
  }

  // navigate to settings page
  settingsNav()
  {
    this.navCtrl.push(SettingsPage);
  }

  // click floating action button
  clickFab() {
    document.getElementById("home-fab").click();
  }

  // add an item (show a separate component)
  showAddItem() {
    //this.updateListKey();
    let modal = this.modalCtrl.create(AddItemComponent, {listPath: `shopping-lists/${this.listKey}`});
    modal.present();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  // delete an item
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  // update key
  updateListKey() {
    this.listKey = (this.listType=="public" ? this.authProv.currentUserHouseholdKey : this.authProv.currentUserPrivateKey);
  }

  // update shopping list database reference
  updateList() {
    this.updateListKey();
    this.itemsRef = this.db.list(`shopping-lists/${this.listKey}`);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
