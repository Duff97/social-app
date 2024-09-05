import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.scss'
})
export class GroupItemComponent {
  @Input() name!: string
}
