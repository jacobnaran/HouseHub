import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.interface';
import { Subscription } from 'rxjs/Subscription';
import { Events } from 'ionic-angular';

/*
  source: https://angularfirebase.com/snippets/angularfire2-version-4-authentication-service/
*/

@Injectable()
export class DatabaseProvider {

  authState: any = null;
  currentUser = {} as User;
  currentHouseholdName: string;
  userRef: Subscription;

  // whether a user is in the process of registering
  registering: boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              public events: Events) {

    this.afAuth.authState.subscribe((auth) => {
      //console.log(auth);
      this.authState = auth;
      this.updateUserRef();
    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  private updateUserRef(): void {
    if (this.authenticated) {
      //console.log(this.currentUserId);

      // do not execute code if user data hasn't been pushed yet
      if (this.registering)
        return;

      this.userRef = this.db.object(`users/${this.currentUserId}`).valueChanges().subscribe((data) => {
        this.currentUser.name = data['name'];
        this.currentUser.username = data['username'];
        this.currentUser.email = data['email'];
        this.currentUser.householdKey = data['householdKey'];
        this.db.object(`households/${this.currentUser.householdKey}`).valueChanges().subscribe((dat) => {
          this.currentHouseholdName = dat['name'];
        });
        this.currentUser.privateKey = data['privateKey'];

        // for updating lists
        this.events.publish('user:update');
      });
    }
  }

  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authenticated ? this.currentUser.name : '';
  }

  get currentUserEmail(): string {
    return this.authenticated ? this.currentUser.email : '';
  }

  get currentUserPrivateKey(): string {
    return this.authenticated ? this.currentUser.privateKey : '';
  }

  get currentUserHouseholdKey(): string {
    return this.authenticated ? this.currentUser.householdKey : '';
  }

  // creates user and logs in
  emailSignUp(newUser: User, password: string) {
    this.registering = true;
    return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, password)
      .then((auth) => {
        this.authState = auth;
        newUser.privateKey = this.db.list('shopping-lists').push(null).key;
        newUser.householdKey = 'nullhouseholdkey';
        this.db.object(`users/${auth.uid}`).set(newUser);
        this.registering = false;
        this.updateUserRef();
      })
  }

  emailLogin(email:string, password:string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .catch(error => console.log(error));
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.userRef.unsubscribe();
    this.currentUser = {} as User;
  }
}
