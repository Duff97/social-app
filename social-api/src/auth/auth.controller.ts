import { Controller, Post, Body } from '@nestjs/common';
import * as FirebaseAuth from 'firebase/auth';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  async signUp(@Body() { email, password }: SignUpDto) {
    const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(
      FirebaseAuth.getAuth(),
      email,
      password,
    );

    return { idToken: await userCredential.user.getIdToken() };
  }

  @Post('sign-in')
  async signIn(@Body() { email, password }: SignInDto) {
    const userCredential = await FirebaseAuth.signInWithEmailAndPassword(
      FirebaseAuth.getAuth(),
      email,
      password,
    );

    return { idToken: await userCredential.user.getIdToken() };
  }
}