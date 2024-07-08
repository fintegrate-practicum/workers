import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
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
    const user = await this.userModel.findById(userId).exec();
    return user;
  }


  async checkAndAddUser(auth0_user_id: string, emailFromHeaders: string): Promise<string> {
    if (!emailFromHeaders) {
        throw new BadRequestException('Email not found in headers');
    }

    const existingUserByAuth0Id = await this.findOneByUserAuth0Id(auth0_user_id);
    if (existingUserByAuth0Id) {
        return `User with id ${auth0_user_id} already exists.`;
    }

    const existingUserByEmail = await this.findOneByEmail(emailFromHeaders);
    if (existingUserByEmail) {
        await this.updateAuth0UserId(existingUserByEmail, auth0_user_id);
        return `User with email ${emailFromHeaders} already exists and was updated with the new ID ${auth0_user_id}.`;
    }

    const newUser = new User(); // יש לוודא יצירת אובייקט משתמש נכון לפי הדגם שלך
    newUser.auth0_user_id = auth0_user_id;
    newUser.userEmail = emailFromHeaders;
    await this.createUser(newUser);
    return 'User added successfully.';
}
  async findOneByUserAuth0Id(userId: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ auth0_user_id: userId }).exec();
      if(!user)
      {
        this.logger.error(`user with the id ${userId} was not found`);
        throw new NotFoundException(`user with the id ${userId} was not found`)

      }
      return user;
    } catch (error) {
      this.logger.error('Failed to find user', error.stack);
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ userEmail: email }).exec();

      return user;
    } catch (error) {
      this.logger.error('Failed to find user by email', error.stack);
      throw new HttpException('Error fetching user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateAuth0UserId(existingUserByEmail: User | undefined, auth0_user_id: string): Promise<User | undefined> {
    if (!existingUserByEmail) {
        this.logger.error('User with this email does not exist');
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
        if (!existingUserByEmail.auth0_user_id) {
            existingUserByEmail.auth0_user_id = auth0_user_id;
            console.log(existingUserByEmail.auth0_user_id);
            await this.updateUser(existingUserByEmail.id, existingUserByEmail);
            return existingUserByEmail;
        }
    } catch (error) {
        this.logger.error('Failed to update user', error.stack);
        throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
  async createUser(user: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(user);
    try {
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) { 
        throw new ConflictException('User with the given email already exists');
      }
      else if (error.name === 'ValidationError') { 
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
      }
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { auth0_user_id: id },
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
