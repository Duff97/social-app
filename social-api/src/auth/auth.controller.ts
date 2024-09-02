import { Controller, Post, Body } from '@nestjs/common';
import * as FirebaseAuth from 'firebase/auth';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post('sign-up')
  async signUp(@Body() { username, email, password }: SignUpDto) {
    const userCredential = await FirebaseAuth.createUserWithEmailAndPassword(
      FirebaseAuth.getAuth(),
      email,
      password,
    );

    this.usersService.createProfileForUserId(userCredential.user.uid, {
      name: username,
      bio: ''
    })

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