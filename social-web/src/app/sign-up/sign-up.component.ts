import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    
    const emailElement = form.elements.namedItem('email') as HTMLInputElement
    const email = emailElement.value

    const passwordElement = form.elements.namedItem('password') as HTMLInputElement
    const password = passwordElement.value

    this.authService.signIn(email, password)
  }
}
