import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}

  create(user_id: string, createGroupDto: CreateGroupDto) {
    const userToSave = new this.groupModel({
      owner_id: user_id,
      ...createGroupDto
    })
    return userToSave.save()
  }

  findAll(user_id: string) {
    return this.groupModel.find({
      $or: [
        { owner_id: user_id },
        { member_ids: { $in: [user_id] } }
      ]
    }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
