import { Component, inject } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  authService = inject(AuthService)

  formSubmit(event: SubmitEvent) {
    event.preventDefault()
    console.log('hi')
    const form = event.target as HTMLFormElement
    
    const emailElement = form.elements.namedItem('email') as HTMLInputElement
    const email = emailElement.value

    const passwordElement = form.elements.namedItem('password') as HTMLInputElement
    const password = passwordElement.value

    this.authService.signIn(email, password)
  }
}
