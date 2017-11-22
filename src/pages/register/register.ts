import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { SetupPage } from '../setup/setup';
import { User } from '../../models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/*
 * This page allows a user to register an account to HouseHub.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;  // user object
  password: string;
  submitAttempt: boolean
  userForm: FormGroup

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private dbProv: DatabaseProvider,
              public formBuilder: FormBuilder) {
    this.submitAttempt = false;

    this.userForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(/^[\w\.]+@[a-zA-Z]+\.[a-zA-Z]{2,7}$/)])],
      //username: ['', Validators.compose([Validators.maxLength(20), Validators.required])],
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]
    })
  }

  // create account, log in, and navigate to setup page
  async createAccountAndLogIn() {
    this.submitAttempt = true;
    if (this.userForm.valid) {
      try {
        await this.dbProv.emailSignUp(this.user, this.password);
        this.password = '';
        this.navCtrl.setRoot(SetupPage);
      }
      catch (e) {
        // don't wanna put this in but i think i have to
        this.dbProv.registering = false;
        console.log(e);
      }
    }
  }
}
