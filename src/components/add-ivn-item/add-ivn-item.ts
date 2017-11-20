import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { InventoryItem } from '../../models/inventory-item.interface';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
              private dbProv: DatabaseProvider,
              private statusBar: StatusBar,
              public localNotifications: LocalNotifications) {
    this.addItemRef$ = this.db.list(`inventory-lists/${dbProv.currentUser.householdKey}`);
    this.inventoryItem.expDate = 'hello';
  }

  addItem() {
    var d = new Date(); //create new date object
    var daysLeft_int = parseInt(this.inventoryItem.weeksLeft);
    var date_toStore = d.setDate(d.getDate() + daysLeft_int);
    console.log(date_toStore);

    d.setHours(d.getHours() - 5);
    console.log(d);



    var month = d.getUTCMonth() + 1; //months from 1-12
    var day = d.getUTCDate();
    var year = d.getUTCFullYear();

    var newdate = month + "/" + day + "/" + year;


    var nDate = new Date();
    nDate.setDate(d.getDate());
    nDate.setHours(10);
    nDate.setMinutes(0);
    nDate.setSeconds(0);
    console.log(nDate);

    this.addItemRef$.push({
      name: this.inventoryItem.name,
      // weeksLeft: (date_toStore!=null ? date_toStore.toString() : '')
      weeksLeft: (date_toStore!=null ? newdate.toString() : '')

      });
      this.localNotifications.schedule({
         text: this.inventoryItem.name + ' is/are expiring today',
         at: nDate,
         led: 'FF0000',
         sound: null
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

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }
}
