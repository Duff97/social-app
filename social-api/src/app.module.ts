import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    FirebaseModule, 
    AuthModule, 
    UsersModule,
    MongooseModule.forRoot(process.env.DATABASE_STRING),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
