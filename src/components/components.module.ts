import { NgModule } from '@angular/core';
import { AddItemComponent } from './add-item/add-item';
import { AddIvnItemComponent } from './add-ivn-item/add-ivn-item';
import { AddNoteComponent } from './add-note/add-note';
import { AddReminderComponent } from './add-reminder/add-reminder';
import { EditInvItemComponent } from './edit-inv-item/edit-inv-item';
import { EditReminderComponent } from './edit-reminder/edit-reminder';
@NgModule({
	declarations: [AddItemComponent,
    AddIvnItemComponent,
    AddNoteComponent,
		AddReminderComponent,
    EditInvItemComponent,
    EditReminderComponent],
	imports: [],
	exports: [AddItemComponent,
    AddIvnItemComponent,
		AddReminderComponent,
    AddNoteComponent,
    EditInvItemComponent,
    EditReminderComponent]
})
export class ComponentsModule {}
