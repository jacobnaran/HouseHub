import { Component } from '@angular/core';
import {AlertController} from 'ionic-angular';
import { IonicPage, NavController, ModalController, NavParams, Events } from 'ionic-angular';

import { ShoppingItem } from '../../models/shopping-item.interface';

import { Observable } from 'rxjs/Observable';
// import { Subscription } from 'rxjs/Subscription';

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

  //public ionColor: string = 'primary';
  itemsRef: AngularFireList<any>
  items: Observable<ShoppingItem[]>

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              private db: AngularFireDatabase,
              public events: Events,
              public alertCtrl: AlertController) {

    this.itemsRef = db.list('shopping-list');
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
      //this.buttonColor = "primary";
    // /  if(this.ionColor == "primary")
    //   {
    //   this.ionColor = "secondary";
    // }else
    // {
    //   this.ionColor = "primary";
    // }
    }


  clickFab() {
    document.getElementById("home-fab").click();
  }

  showAddItem() {
    let modal = this.modalCtrl.create(AddItemComponent);
    modal.present();
  }

  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
}
