import { Component } from '@angular/core';
import { Events } from 'ionic-angular';

import { ShoppingListPage } from '../shopping-list/shopping-list';
import { HomePage } from '../home/home';
import { InventoryPage } from '../inventory/inventory';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = ShoppingListPage;
  tab2Root = HomePage;
  tab3Root = InventoryPage;

  constructor(public events: Events) {
  }

}
