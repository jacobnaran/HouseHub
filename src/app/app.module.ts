import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { LocalNotifications } from '@ionic-native/local-notifications';

// firebase stuff
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';
import { AuthProvider } from '../providers/database/database';

// pages
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { InventoryPage } from '../pages/inventory/inventory';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { SetupPage } from '../pages/setup/setup';
import { SettingsPopPage } from '../pages/settings-pop/settings-pop';
import { LoadingPage } from '../pages/loading/loading';
import { ChatPage } from '../pages/chat/chat';

// components
import { AddItemComponent } from '../components/add-item/add-item';
import { AddReminderComponent } from '../components/add-reminder/add-reminder';
import { AddNoteComponent } from '../components/add-note/add-note';
import { EditNoteComponent } from '../components/edit-note/edit-note';
import { AddIvnItemComponent } from '../components/add-ivn-item/add-ivn-item';
import { EditInvItemComponent } from '../components/edit-inv-item/edit-inv-item';
import { EditReminderComponent } from '../components/edit-reminder/edit-reminder';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    ShoppingListPage,
    InventoryPage,
    AddItemComponent,
    AddReminderComponent,
    AddIvnItemComponent,
    AddNoteComponent,
    EditNoteComponent,
    SettingsPage,
    LoginPage,
    RegisterPage,
    EditInvItemComponent,
    SetupPage,
    LoadingPage,
    EditReminderComponent,
    SettingsPopPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    ShoppingListPage,
    AddReminderComponent,
    InventoryPage,
    AddItemComponent,
    AddIvnItemComponent,
    EditInvItemComponent,
    AddNoteComponent,
    EditNoteComponent,
    SettingsPage,
    LoginPage,
    RegisterPage,
    SetupPage,
    LoadingPage,
    EditReminderComponent,
    SettingsPopPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
