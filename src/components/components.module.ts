import { NgModule } from '@angular/core';
import { AddItemComponent } from './add-item/add-item';
import { AddIvnItemComponent } from './add-ivn-item/add-ivn-item';
import { AddNoteComponent } from './add-note/add-note';
import { EditInvItemComponent } from './edit-inv-item/edit-inv-item';
@NgModule({
	declarations: [AddItemComponent,
    AddIvnItemComponent,
    AddNoteComponent,
    EditInvItemComponent],
	imports: [],
	exports: [AddItemComponent,
    AddIvnItemComponent,
    AddNoteComponent,
    EditInvItemComponent]
})
export class ComponentsModule {}
