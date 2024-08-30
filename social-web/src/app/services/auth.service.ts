import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  localStorageKey = 'token'

  signIn(email: string, password: string) {
    return this.http.post<string>(`${environment.apiUrl}/auth/sign-in`, {
      email,
      password
    }).pipe(
      map(token => {
        this.saveTokenToStorage(token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  signUp(email: string, password: string) {
    return this.http.post<string>(`${environment.apiUrl}/auth/sign-in`, {
      email,
      password
    }).pipe(
      map(token => {
        this.saveTokenToStorage(token);
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  saveTokenToStorage(token: string) {
    localStorage.setItem(this.localStorageKey, token)
  }

  getTokenFromStorage() {
    return localStorage.getItem(this.localStorageKey)
  }
}
