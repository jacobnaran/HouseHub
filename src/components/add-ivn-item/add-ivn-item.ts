import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { InventoryItem } from '../../models/inventory-item.interface';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';

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
    this.inventoryItem.expDate = 'hello';
  }

  //  ionViewDidLoad()
  //  {
  //    this.focusInput();
  //   }


  addItem() {
    var d = new Date(); //create new date object
    var weeksLeft_int = parseInt(this.inventoryItem.weeksLeft);
    var date_toStore = d.setDate(d.getDate()+weeksLeft_int);
    console.log(d);
    //console.log(date_toStore); //this was used for testing

    this.addItemRef$.push({
      name: this.inventoryItem.name,
      weeksLeft: (date_toStore!=null ? date_toStore : '?')
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
