import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

const JOIN_CODE_EXPIRATION_DAYS = 7000

@Injectable()
export class GroupsService {
  constructor(@InjectModel(Group.name) private groupModel: Model<Group>, @InjectModel(User.name) private userModel: Model<User>) { }

  findOne(id: string) {
    return this.groupModel
    .findById(id)
    .populate(['owner', 'members'])
    .exec()
  }

  create(user_id: string, createGroupDto: CreateGroupDto) {

    const userToSave = new this.groupModel({
      owner: user_id,
      ...createGroupDto
    })
    return userToSave.save()
  }

  findAll(user_id: string) {
    return this.groupModel.find({
      $or: [
        { owner: user_id },
        { members: { $in: [user_id] } }
      ]
    }).exec();
  }

  async join(user_id: string, code: string) {
    const groupToJoin = await this.groupModel.findOne({ join_code: code }).populate(['owner', 'members']).exec()

    if (!groupToJoin) {
      throw new NotFoundException('Group not found or invalid join code')
    }

    if (groupToJoin.members.findIndex(member => member._id == user_id) !== -1) {
      throw new BadRequestException('User is already in the group')
    }

    const currentDate = new Date()

    if (currentDate > groupToJoin.join_code_expiration_date) {
      throw new ForbiddenException('Join code has expired')
    }

    groupToJoin.set('members', [
      ...groupToJoin.members.map(member => member._id),
      user_id
    ])
    return (await groupToJoin.save()).populate(['owner', 'members'])
  }

  async generateJoinCode(group_id: string, user_id: string) {
    const targetGroup = await this.findOne(group_id)

    if (!targetGroup) {
      throw new NotFoundException('Group not found')
    }

    if (targetGroup.owner._id !== user_id) {
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
