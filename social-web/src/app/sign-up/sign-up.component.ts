import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  authService = inject(AuthService)

  formSubmit(event: SubmitEvent) {
    event.preventDefault()
    const form = event.target as HTMLFormElement

    const usernameElement = form.elements.namedItem('username') as HTMLInputElement
    const username = usernameElement.value
    
    const emailElement = form.elements.namedItem('email') as HTMLInputElement
    const email = emailElement.value

    const passwordElement = form.elements.namedItem('password') as HTMLInputElement
    const password = passwordElement.value

    const confirmPasswordElement = form.elements.namedItem('confirm-password') as HTMLInputElement
    const confirmPassword = confirmPasswordElement.value

    if (confirmPassword == password)
      this.authService.signUp(username, email, password)
    else
      alert('Passwords do not match')
  }

}
