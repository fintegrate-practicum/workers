import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { User } from 'src/schemas/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async findOneByUserId(userId: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ auth0_user_id: userId }).exec();
      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ userEmail: email }).exec();
      console.log("fsdafs", user);

      return user;
    } catch (error) {
      this.logger.error('Failed to find user by email', error.stack);
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async updatAuth0UserId(existingUserByEmail: User, auth0_user_id: string): Promise<User | undefined> {
    try {
      if (existingUserByEmail) {
        if (!existingUserByEmail.auth0_user_id)
          existingUserByEmail.auth0_user_id = auth0_user_id;
        console.log(existingUserByEmail.auth0_user_id);
        await this.updateUser(existingUserByEmail.id, existingUserByEmail);

        return existingUserByEmail;
      }
    } catch (error) {
      this.logger.error('The user has not yet been added to the system Please access the manager', error.stack);
      throw new HttpException('user not found', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        user,
        { new: true },
      ).exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
