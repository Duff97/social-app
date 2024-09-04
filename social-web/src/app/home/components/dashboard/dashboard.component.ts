import { Component } from '@angular/core';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupComponent } from './components/group/group.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GroupListComponent, GroupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
