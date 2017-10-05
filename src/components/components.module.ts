import { NgModule } from '@angular/core';
import { AddItemComponent } from './add-item/add-item';
import { AddIvnItemComponent } from './add-ivn-item/add-ivn-item';
@NgModule({
	declarations: [AddItemComponent,
    AddIvnItemComponent],
	imports: [],
	exports: [AddItemComponent,
    AddIvnItemComponent]
})
export class ComponentsModule {}
