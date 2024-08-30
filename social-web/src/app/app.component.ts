import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'social-web';
  authService = inject(AuthService)
  router = inject(Router);

  constructor() {
    const token = this.authService.getTokenFromStorage();
    const currentRoute = this.router.url;

    if (!token && !this.isAuthRoute(currentRoute)) {
      console.log('hi')
      this.router.navigate(['/sign-in']);
    }
  }

  isAuthRoute(route: string): boolean {
    return route === '/sign-in' || route === '/sign-up';
  }
}
