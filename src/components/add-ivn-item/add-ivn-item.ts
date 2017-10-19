import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { InventoryItem } from '../../models/inventory-item.interface';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the AddIvnItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-ivn-item',
  templateUrl: 'add-ivn-item.html'
})
export class AddIvnItemComponent {

  inventoryItem = {} as InventoryItem
  addItemRef$: AngularFireList<InventoryItem>

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase) {
    this.addItemRef$ = this.db.list('inventory-list');
  }

  addItem() {
    this.addItemRef$.push({
      name: this.inventoryItem.name,
      weeksLeft: this.inventoryItem.weeksLeft
    });

    this.dismiss();
  }

  dismiss() {
    this.inventoryItem = {} as InventoryItem;
    this.viewCtrl.dismiss();
  }
}
