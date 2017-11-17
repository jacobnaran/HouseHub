import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ShoppingItem } from '../../models/shopping-item.interface';

import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

import { AddItemComponent } from '../../components/add-item/add-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { SettingsPage} from '../settings/settings';

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

  userId: string;
  hhKey: string;
  privKey: string;

  //public ionColor: string = 'primary';
  itemsRef: AngularFireList<any>
  items: Observable<ShoppingItem[]>

  // default is public shopping list
  listName: string = "shopping-list"

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private db: AngularFireDatabase,
              public events: Events,
              public alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              private statusBar: StatusBar) {

    // is this guaranteed to happen before the next line?
    this.afAuth.authState.subscribe(auth => {
      this.userId = auth.uid;
    })

    // this.db.object(`users/${this.userId}`).valueChanges().subscribe(data => {
    //   this.hhKey = data.householdKey;
    //   this.privKey = data.privateKey;
    // });

    this.itemsRef = db.list(this.listName);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
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
    let modal = this.modalCtrl.create(AddItemComponent, {listName: this.listName});
    modal.present();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#222');
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }

  changeList() {
    this.itemsRef = this.db.list(this.listName);
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }
}
