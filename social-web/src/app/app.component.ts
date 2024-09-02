import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'social-web';
  authService = inject(AuthService)
  router = inject(Router);
  location = inject(Location)

  ngOnInit() {
    const token = this.authService.getTokenFromStorage();
    if (!token && !this.isAuthRoute()) {
      this.router.navigate(['/sign-in']);
    }
  }

  isAuthRoute(): boolean {
    const currentRoute = this.location.path();
    return currentRoute === '/sign-in' || currentRoute === '/sign-up';
  }
}
