import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { InventoryItem } from '../../models/inventory-item.interface';

import { Subscription } from 'rxjs/Subscription';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireList } from 'angularfire2/database';
import { DatabaseProvider } from '../../providers/database/database';
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
  addItemRef$: AngularFireList<InventoryItem>
  itemRef: Subscription;

  text: string;
  itemKey: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private statusBar: StatusBar,
              private dbProv: DatabaseProvider) {
    
    this.itemKey = this.navParams.get('key');
    this.itemRef = db.object(`inventory-lists/${this.dbProv.currentUser.householdKey}/${this.itemKey}`).valueChanges().subscribe((item) => {
      this.inventoryItem.name = item['name'];
      this.inventoryItem.weeksLeft = item['weeksLeft'];
    });
    this.addItemRef$ = this.db.list(`inventory-lists/${this.dbProv.currentUser.householdKey}`);
  }

  addItem() {
    this.addItemRef$.update(this.itemKey, this.inventoryItem);
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
    this.itemRef.unsubscribe();
    this.viewCtrl.dismiss();

    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#93A3BC');
  }
  }
