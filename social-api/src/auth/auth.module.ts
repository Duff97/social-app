import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { FirebaseAuthStrategy } from './firebase-auth-strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  controllers: [AuthController],
  providers: [FirebaseAuthStrategy, UsersService],
  imports: [PassportModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class AuthModule {}
