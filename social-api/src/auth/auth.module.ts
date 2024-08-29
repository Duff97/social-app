import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseAuthStrategy } from './firebase-auth-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAuthStrategy],
  imports: [PassportModule]
})
export class AuthModule {}
