import { Component, inject, signal } from '@angular/core';
import { GroupsService } from '../../../../../services/groups/groups.service';
import { Group } from '../../../../../../interfaces/group.interface';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { PopupService } from '../../../../../services/popup/popup.service';
import { CreateGroupFormComponent } from './components/create-group-form/create-group-form.component';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [GroupItemComponent, MatButtonModule, CommonModule, CreateGroupFormComponent],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  groupsService = inject(GroupsService)
  popupService = inject(PopupService)
  groups = signal<Group[]>([])

  ngOnInit() {
    this.groupsService.get().subscribe(groups => {
      this.groups.set(groups)
    })
  }

  showCreateForm() {
    this.popupService.display(CreateGroupFormComponent);
  }

  showJoinForm() {
    alert('Join form')
  }
}
