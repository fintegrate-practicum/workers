import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { Employee } from 'src/schemas/employee.entity';
import { User } from 'src/schemas/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneByUserId(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }

  async getUser(auth0_user_id: string): Promise<User> {
    try {
      const user = await this.userModel.findOne({ auth0_user_id }).exec();
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error fetching user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createUser(user: CreateUserDto): Promise<CreateUserDto> {
    const newUser = new this.userModel(user);
    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, user: User): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { auth0_user_id: id },
        user,
        { new: true },
      );
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
