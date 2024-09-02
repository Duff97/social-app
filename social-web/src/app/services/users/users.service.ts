import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../../../interfaces/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient)

  getProfile() {
    return this.http.get<User>(`${environment.apiUrl}/users/profile`)
  }
}
