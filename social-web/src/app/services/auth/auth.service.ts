import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Auth } from '../../../interfaces/auth.interface';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  router = inject(Router)
  localStorageKey = 'token'

  signIn(email: string, password: string) {
    return this.http.post<Auth>(`${environment.apiUrl}/auth/sign-in`, { email, password })
      .subscribe(auth => {
        this.saveTokenToStorage(auth.idToken)
        this.router.navigate(['/home'])
      })
  }

  signUp(username: string, email: string, password: string) {
    return this.http.post<Auth>(`${environment.apiUrl}/auth/sign-up`, {
      username,
      email,
      password
    })
      .subscribe(auth => {
        this.saveTokenToStorage(auth.idToken)
        this.router.navigate(['/home'])
      })
  }

  signOut() {
    localStorage.removeItem(this.localStorageKey)
    this.router.navigate(['/sign-in'])
  }

  saveTokenToStorage(token: string) {
    localStorage.setItem(this.localStorageKey, token)
  }

  getTokenFromStorage() {
    return localStorage.getItem(this.localStorageKey)
  }
}
