import { Controller, Get, Post, Body, UseGuards, Req, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('groups')
@UseGuards(AuthGuard('bearer'))
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Req() req: Request, @Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(req.user.user_id, createGroupDto);
  }

  @Get('join/:code')
  join(@Req() req: Request, @Param('code') code: string) {
    return this.groupsService.join(req.user.user_id, code);
  }

  @Get(':id/code')
  generateJoinCode(@Req() req: Request, @Param('id') id: string) {
    return this.groupsService.generateJoinCode(id, req.user.user_id)
  }

  @Get()
  findAll(@Req() req: Request) {
    return this.groupsService.findAll(req.user.user_id);
  }
}
