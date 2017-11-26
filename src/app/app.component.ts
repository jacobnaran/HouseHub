import { Component } from '@angular/core';
import { App, Events, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/database/database';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { LoadingPage } from '../pages/loading/loading';
import { ChatPage } from '../pages/chat/chat';
import { Push, PushObject, PushOptions} from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoadingPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public events: Events,
              private app: App,
              private authProv: AuthProvider,
              public push: Push,
            public alertCtrl:AlertController) {

    // listen for logout event then sets login page as root
    this.events.subscribe('user:logout', () => {
      this.app.getRootNav().setRoot(LoginPage);
    });

    this.events.subscribe('chat:open', () => {
      this.app.getRootNav().push(ChatPage);
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.pushsetup();
      splashScreen.hide();
    });
  }

  pushsetup() {
    const options: any = {
     android: {
         senderID: "350833857485"
     },
     ios: {
         alert: 'true',
         badge: true,
         sound: 'false'
     },
     windows: {}
  };

  const pushObject: PushObject = this.push.init(options);

  pushObject.on('notification').subscribe((notification: any) => {
    if (notification.additionalData.foreground) {
      let youralert = this.alertCtrl.create({
        title: 'New Push notification',
        message: notification.message
      });
      youralert.present();
    }
  });

  pushObject.on('registration').subscribe((registration: any) => {
     //do whatever you want with the registration ID
  });

  pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }
}
