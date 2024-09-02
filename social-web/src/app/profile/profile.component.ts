import { Component, inject, signal } from '@angular/core';
import { UsersService } from '../services/users/users.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  usersService = inject(UsersService)
  currentUser = signal<User | null>(null)

  constructor() {
    this.usersService.getProfile().subscribe(
      user => {
        this.currentUser.set(user)
      }
    )
  }
}
