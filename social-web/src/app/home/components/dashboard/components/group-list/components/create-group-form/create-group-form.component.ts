import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GroupsService } from '../../../../../../../services/groups/groups.service';
import { PopupService } from '../../../../../../../services/popup/popup.service';

@Component({
  selector: 'app-create-group-form',
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MatButton],
  templateUrl: './create-group-form.component.html',
  styleUrl: './create-group-form.component.scss'
})
export class CreateGroupFormComponent {
  groupsService = inject(GroupsService)
  popupService = inject(PopupService)

  formSubmit(event : SubmitEvent) {
    event.preventDefault()

    const form = event.target as HTMLFormElement

    const nameElement = form.elements.namedItem('name') as HTMLInputElement
    const name = nameElement.value
    
    try {
      this.groupsService.create({
        name,
        memberIds: []
      })
      form.reset()
      this.popupService.hide()
    } catch (e) {}    
  }
}
