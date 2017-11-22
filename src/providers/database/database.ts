import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from '../../models/user.interface';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

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

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      this.updateUserRef(); // move this to sign in method
    });

  }

  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  get userUpdates(): Observable<User> {
    return this.db.object(`users/${this.currentUserId}`).valueChanges();
  }

  private updateUserRef(): void {
    if (this.authenticated) {

      // do not execute code if user data hasn't been pushed yet
      if (this.registering)
        return;

      this.userRef = this.userUpdates.subscribe((userData) => {
        if (userData!==null) {
          this.currentUser.name = userData.name;
          this.currentUser.email = userData.email;
          this.currentUser.householdKey = userData.householdKey;
          this.currentUser.privateKey = userData.privateKey;
          // safe to change this to 'this.currentUser = userData'? worried about aliasing
        }
        else {
          console.log('error: user data not found');
        }
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
    return this.authenticated ? this.authState.uid : 'no-auth';
  }

  get currentUserName(): string {
    return this.authenticated ? this.currentUser.name : '';
  }

  get currentUserEmail(): string {
    return this.authenticated ? this.currentUser.email : '';
  }

  get currentUserPrivateKey(): string {
    return this.authenticated ? this.currentUser.privateKey : 'no-auth';
  }

  get currentUserHouseholdKey(): string {
    return this.authenticated ? this.currentUser.householdKey : 'no-auth';
  }

  // create user and log in
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

  // sign out then clear variables
  async signOut() {
    await this.afAuth.auth.signOut();
    this.userRef.unsubscribe();
    this.currentUser = {} as User;
  }

  deleteAccount() {
    // temporarily store user id and auth object
    let id = this.currentUserId;
    let hhKey = this.currentUserHouseholdKey;
    let privKey = this.currentUserPrivateKey;
    let userDel = this.authState;

    // sign out user
    this.signOut();

    // wait 1 second
    let that = this;
    setTimeout(function() {

      // clear user from database
      that.db.list('users').remove(id);
      that.db.list(`households/${hhKey}/members`).remove(id);
      that.db.list('shopping-lists').remove(privKey);

      // delete user account on firebase
      userDel.delete();

    }, 1000);
  }
}
