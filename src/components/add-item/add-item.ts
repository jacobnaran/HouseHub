import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ShoppingItem } from '../../models/shopping-item.interface';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-item',
  templateUrl: 'add-item.html'
})
export class AddItemComponent {

  shoppingItem = {} as ShoppingItem
  addItemRef$: AngularFireList<ShoppingItem>

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              public navParams: NavParams,
              private statusBar: StatusBar) {
    this.addItemRef$ = db.list(navParams.get('listPath'));
  }

  addItem() {
    this.addItemRef$.push({
      name: this.shoppingItem.name
    });

    this.dismiss();
  }

  dismiss() {
    this.shoppingItem = {} as ShoppingItem;
    this.viewCtrl.dismiss();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }
}
