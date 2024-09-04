import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient)

  currentUser = signal<User | null>(null)

  setCurrentUser(user : User) {
    this.currentUser.set(user)
  }

  getCurrentUser(){
    return this.currentUser()
  }

  getProfile() {
    return this.http.get<User>(`${environment.apiUrl}/users/profile`)
  }
}
