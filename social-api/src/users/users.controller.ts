import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('bearer'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  getProfile(@Req() req: Request) {
    return this.usersService.findOne(req.user.user_id)
  }

  @Post('/profile')
  createProfile(@Req() req: Request, @Body() createUserDto: CreateUserDto) {
    return this.usersService.createProfileForUserId(req.user.user_id, createUserDto)
  }
} 