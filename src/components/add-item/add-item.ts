import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

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

  text: string;

  constructor(public viewCtrl: ViewController) {
    console.log('Hello AddItemComponent Component');
    this.text = 'Hello World';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
