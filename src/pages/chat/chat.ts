import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

import { AuthProvider } from '../../providers/database/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  message: string = '';
  chatRef: AngularFireList<any>;
  messageList: Observable<any[]>;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, private db: AngularFireDatabase, private authProv: AuthProvider) {
    this.chatRef = db.list(`chats/${this.authProv.currentUserHouseholdKey}`);
    this.messageList = this.chatRef.valueChanges();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.content.scrollToBottom(0); // duration; default is 300
    }, 1000); // delay for content to render
  }

  sendMessage() {
    if (this.message.length==0) {
      return;
    }
    this.chatRef.push({
      sender: this.authProv.currentUserName,
      message: this.message
    });
    this.message = '';
  }

  // ionViewDidEnter() {
  //     let elem = <HTMLElement>document.querySelector(".tabbar");
  //     if (elem != null) {
  //       elem.style.display = 'none';
  //     }
  //   }


}
