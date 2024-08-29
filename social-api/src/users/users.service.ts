import { BadGatewayException, ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const userToSave = new this.userModel(createUserDto)
    return userToSave.save()
  }

  findAll() {
    return this.userModel.find().exec()
  }

  

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }

  async findOne(id: string): Promise<User | null> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async createProfileForUserId(id: string, createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findOne(id);
  
      if (existingUser) {
        return this.userModel.findByIdAndUpdate(
          id,
          {
            ...createUserDto,
          },
          { new: true }
        );
      }
  
      const userToSave = new this.userModel({
        _id: id,
        ...createUserDto,
      });
  
      return await userToSave.save();
    } catch (error) {
      throw new BadGatewayException('An error occurred while saving the profile.', error.message);
    }
  }
}
