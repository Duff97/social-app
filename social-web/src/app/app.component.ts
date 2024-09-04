import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule, Location } from '@angular/common';
import { UsersService } from './services/users/users.service';
import { PopupComponent } from './components/popup/popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule, PopupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'social-web';
  authService = inject(AuthService)
  userService = inject(UsersService)
  router = inject(Router);
  location = inject(Location)

  ngOnInit() {
    const token = this.authService.getTokenFromStorage();
    if (!token && !this.isAuthRoute()) {
      this.router.navigate(['/sign-in']);
    } else if (token) {
      try {
        this.userService.getProfile().subscribe(user => {
          this.userService.setCurrentUser(user)
        })
      } catch(error) {
        this.router.navigate(['/sign-in'])
      }      
    }
  }

  isAuthRoute(): boolean {
    const currentRoute = this.location.path();
    return currentRoute === '/sign-in' || currentRoute === '/sign-up';
  }
}
