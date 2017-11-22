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
export class AuthProvider {

  authState: any = null;
  currentUser = {} as User;
  userRef: Subscription;

  // whether a user is in the process of registering
  registering: boolean = false;

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              public events: Events) {

    this.afAuth.authState.subscribe((auth) => {
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

      // do not execute code if user data hasn't been pushed yet
      if (this.registering)
        return;

      this.userRef = this.db.object(`users/${this.currentUserId}`).valueChanges().subscribe((data) => {
        this.currentUser.name = data['name'];
        this.currentUser.email = data['email'];
        this.currentUser.householdKey = data['householdKey'];
        this.currentUser.privateKey = data['privateKey'];

        // for updating lists
        //this.events.publish('user:update');
      });
    }
  }

  public updateDisplayName(name: string) {
    this.db.object(`users/${this.currentUserId}`).update({ name: name });
    this.db.object(`households/${this.currentUserHouseholdKey}/members/${this.currentUserId}`).set(name);
  }

  public updateHousehold(id: string) {

    // remove user from current household list
    this.db.list(`households/${this.currentUserHouseholdKey}/members`).remove(this.currentUserId);

    // add user to new household list
    this.db.object(`households/${id}/members/${this.currentUserId}`).set(this.currentUserName);


    // update user profile
    this.db.object(`users/${this.currentUserId}`).update({ householdKey: id });
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

  // create user and logs in
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

  // sign out and clear variables
  async signOut() {
    await this.afAuth.auth.signOut();
    this.userRef.unsubscribe();
    this.currentUser = {} as User;
  }
}
