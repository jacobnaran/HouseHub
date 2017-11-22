import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { InventoryItem } from '../../models/inventory-item.interface';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../../providers/database/database';
/**
 * Generated class for the EditInvItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-inv-item',
  templateUrl: 'edit-inv-item.html'
})
export class EditInvItemComponent {

  inventoryItem = {} as InventoryItem
  itemsRef: AngularFireList<InventoryItem>

  text: string;
  itemKey: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private statusBar: StatusBar,
              private authProv: AuthProvider) {

    this.itemKey = navParams.get('key');
    db.object(`inventory-lists/${this.authProv.currentUser.householdKey}/${this.itemKey}`).valueChanges().first().subscribe((item) => {
      this.inventoryItem.name = item['name'];
      this.inventoryItem.weeksLeft = item['weeksLeft'];
    });
    this.itemsRef = this.db.list(`inventory-lists/${this.authProv.currentUser.householdKey}`);
  }

  addItem() {
    this.itemsRef.update(this.itemKey, this.inventoryItem);
    // //push({
    //   name: this.inventoryItem.name,
    //   weeksLeft: (this.inventoryItem.weeksLeft!=null ? this.inventoryItem.weeksLeft : '')
    // });

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
