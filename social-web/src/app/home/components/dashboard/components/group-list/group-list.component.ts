import { Component, inject, signal } from '@angular/core';
import { GroupsService } from '../../../../../services/groups/groups.service';
import { Group } from '../../../../../../interfaces/group.interface';
import { GroupItemComponent } from './components/group-item/group-item.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [GroupItemComponent, MatButtonModule, CommonModule],
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss'
})
export class GroupListComponent {
  groupsService = inject(GroupsService)

  groups = signal<Group[]>([])

  ngOnInit() {
    this.groupsService.get().subscribe(groups => {
      this.groups.set(groups)
    })
  }

  showCreateForm() {
    alert('Create form')
  }

  showJoinForm() {
    alert('Join form')
  }
}
