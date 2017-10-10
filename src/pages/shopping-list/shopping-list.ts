import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item.interface';

import { Observable } from 'rxjs/Observable';
import { AddItemComponent } from '../../components/add-item/add-item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

  //items: AngularFireList<any>
  items: Observable<ShoppingItem[]>
  // items: ShoppingItem[]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private db: AngularFireDatabase) {

    // this.itemsRef = db.list('shopping-list');
    this.items = db.list('shopping-list').valueChanges();

    // db.list('shopping-list').snapshotChanges().map(action => {
    //   const arr = [];
    //   action.forEach(e => {
    //     const $key = e.key;
    //     arr.push({ $key, ...e.payload.val() });
    //   });
    //   return arr;
    // }).subscribe(items => (this.items = items));

  }

  showAddItem() {
    let modal = this.modalCtrl.create(AddItemComponent);
    modal.present();
  }

}
