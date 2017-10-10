import { NgModule } from '@angular/core';
import { AddItemComponent } from './add-item/add-item';
import { AddIvnItemComponent } from './add-ivn-item/add-ivn-item';
import { AddNoteComponent } from './add-note/add-note';
@NgModule({
	declarations: [AddItemComponent,
    AddIvnItemComponent,
    AddNoteComponent],
	imports: [],
	exports: [AddItemComponent,
    AddIvnItemComponent,
    AddNoteComponent]
})
export class ComponentsModule {}
