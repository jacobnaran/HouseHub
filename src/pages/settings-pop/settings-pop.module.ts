import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPopPage } from './settings-pop';

@NgModule({
  declarations: [
    SettingsPopPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPopPage),
  ],
})
export class SettingsPopPageModule {}
