import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { InventoryItem } from '../../models/inventory-item.interface';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'add-ivn-item',
  templateUrl: 'add-ivn-item.html'
})
export class AddIvnItemComponent {

  inventoryItem = {} as InventoryItem
  addItemRef$: AngularFireList<InventoryItem>

  constructor(public viewCtrl: ViewController,
              private db: AngularFireDatabase,
              private dbProv: DatabaseProvider) {
    this.addItemRef$ = this.db.list(`inventory-lists/${dbProv.currentUser.householdKey}`);
    this.inventoryItem.expDate = 'hello';
  }

  addItem() {
    var d = new Date(); //create new date object
    var daysLeft_int = parseInt(this.inventoryItem.weeksLeft);
    var date_toStore = d.setDate(d.getDate() + daysLeft_int);

    console.log(d);

    this.addItemRef$.push({
      name: this.inventoryItem.name,
      weeksLeft: (date_toStore!=null ? date_toStore.toString() : '')

      //weeksLeft: (this.inventoryItem.weeksLeft!=null ? this.inventoryItem.weeksLeft : '')
    });

    this.dismiss();
  }

  focusInput(input) {
   input.setFocus();
}

  dismiss() {
    this.inventoryItem = {} as InventoryItem;
    this.viewCtrl.dismiss();
  }
}
