import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';

const JOIN_CODE_EXPIRATION_DAYS = 7000

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>) { }

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

  async join(user_id: string, code: string) {
    const groupToJoin = await this.groupModel.findOne({ join_code: code }).exec()

    if (!groupToJoin) {
      throw new NotFoundException('Group not found or invalid join code')
    }

    if (groupToJoin.member_ids.includes(user_id) || groupToJoin.owner_id === user_id) {
      throw new BadRequestException('User is already in the group')
    }

    const currentDate = new Date()

    if (currentDate > groupToJoin.join_code_expiration_date) {
      throw new ForbiddenException('Join code has expired')
    }

    groupToJoin.member_ids.push(user_id)
    return groupToJoin.save()
  }

  async generateJoinCode(group_id: string, user_id: string) {
    const targetGroup = await this.groupModel.findById(group_id).exec()

    if (!targetGroup) {
      throw new NotFoundException('Group not found')
    }

    if (targetGroup.owner_id !== user_id) {
      throw new ForbiddenException('Only group owner can generate join codes')
    }

    const code = this.generateRandomCode(6)
    targetGroup.join_code = code

    const expiration_date = new Date()
    expiration_date.setDate(expiration_date.getDate() + JOIN_CODE_EXPIRATION_DAYS)
    targetGroup.join_code_expiration_date = expiration_date

    return targetGroup.save()
  }

  private generateRandomCode(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }
}
