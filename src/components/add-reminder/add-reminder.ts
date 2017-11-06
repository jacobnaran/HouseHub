import { Component } from '@angular/core';

/**
 * Generated class for the AddReminderComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'add-reminder',
  templateUrl: 'add-reminder.html'
})
export class AddReminderComponent {

  text: string;

  constructor() {
    console.log('Hello AddReminderComponent Component');
    this.text = 'Hello World';
  }

}
