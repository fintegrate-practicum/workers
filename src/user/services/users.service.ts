import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { UpdateUserDto } from 'src/dto/updateUser.dto';
import { User } from 'src/schemas/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  private readonly auth0Domain: string ;
  constructor(@InjectModel(User.name) private userModel: Model<User>) {
    this.auth0Domain =  process.env.VITE_AUTH0_DOMAIN as string
    console.log("process.env.VITE_AUTH0_DOMAIN", process.env.VITE_AUTH0_DOMAIN);
    if (!this.auth0Domain) {
      throw new Error('Missing Auth0 domain');
    }
  }
  async findOneByUserId(userId: string): Promise<User | undefined> {
    if (!userId) {
      throw new BadRequestException('User ID must be provided');
    }
    const user = await this.userModel.findById(userId).exec();
    return user;
  }
  async findOneByUserAuth0Id(userId: string): Promise<User> {
    this.logger.log(`Searching for user with ID: ${userId}`);
    let user = await this.userModel.findOne({ auth0_user_id: userId });
    if (!user) {
      this.logger.error(`User with the ID ${userId} was not found`);
      this.logger.log(`Fetching user metadata from Auth0 for user ID: ${userId}`);
      const userMetadata = await this.fetchUserMetadataFromAuth0(userId);
      this.logger.log(`Creating new user with metadata: ${JSON.stringify(userMetadata)}`);
      const newUser = new this.userModel({
        auth0_user_id: userId,
        email: userMetadata.email,
        email_verified: userMetadata.email_verified,
        family_name: userMetadata.family_name,
        given_name: userMetadata.given_name,
        picture: userMetadata.picture,
        nickname: userMetadata.nickname,
        created_at: userMetadata.created_at,
        updated_at: userMetadata.updated_at,
        role: 'client',
      });
      user = await newUser.save();
      this.logger.log(`New user created with ID: ${user._id}`);
    }
    return user;
  }
  async fetchUserMetadataFromAuth0(auth0Id: string): Promise<any> {
    this.logger.log(`Entering fetchUserMetadataFromAuth0 function`);
    const url = `https://${this.auth0Domain}/api/v2/users/${auth0Id}`;
    this.logger.log(`Fetching from URL: ${url}`);
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${process.env.AUTH0_API_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch user metadata from Auth0: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      this.logger.error(`Failed to fetch user metadata: ${error.message}`);
      throw error;
    }
  }
  async findOneByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.userModel.findOne({ userEmail: email }).exec();
      if (!user) {
        this.logger.error(`User with the email ${email} was not found`);
        throw new NotFoundException(`User with the email ${email} was not found`);
      }
      return user;
    } catch (error) {
      this.logger.error('Failed to find user by email', error.stack);
      throw new InternalServerErrorException('Error fetching user');
    }
  }
  async updateAuth0UserId(existingUserByEmail: User | undefined, auth0_user_id: string): Promise<User | undefined> {
    if (!existingUserByEmail) {
      this.logger.error('User with this email does not exist');
      throw new NotFoundException('User not found');
    }
    try {
      if (!auth0_user_id) {
        this.logger.error('auth0_user_id is not provided');
        throw new HttpException('Auth0 user ID must be provided', HttpStatus.BAD_REQUEST);
      }
      if (!existingUserByEmail.auth0_user_id) {
        existingUserByEmail.auth0_user_id = auth0_user_id;
        await this.updateUser(existingUserByEmail.id, existingUserByEmail);
        return existingUserByEmail;
      } else {
        this.logger.error('User already has an Auth0 user ID');
        throw new HttpException('User already has an Auth0 user ID', HttpStatus.CONFLICT);
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        this.logger.error('Validation error', error.stack);
        throw new HttpException('Validation error: ' + error.message, HttpStatus.BAD_REQUEST);
      } else if (error.name === 'MongoError' && error.code === 11000) {
        this.logger.error('Duplicate key error', error.stack);
        throw new HttpException('Duplicate key error: ' + error.message, HttpStatus.CONFLICT);
      } else {
        this.logger.error('Failed to update user', error.stack);
        throw new InternalServerErrorException('Error updating user');
      }
    }
  }
  async createUser(user: CreateUserDto): Promise<User> {
    if (!user) {
      throw new BadRequestException('User is null');
    }
    const newUser = new this.userModel(user);
    try {
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with the given email already exists');
      } else if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }
  async updateUser(id: string, user: UpdateUserDto): Promise<User> {
    if (!user) {
      throw new BadRequestException('User is null');
    }
    if (!id) {
      throw new BadRequestException('User ID not provided');
    }
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
      if (error.name === 'ValidationError') {
        throw new BadRequestException('Validation failed: ' + error.message);
      } else if (error.code === 11000) {
        throw new ConflictException('Duplicate user data');
      } else {
        throw new InternalServerErrorException('Unexpected error occurred');
      }
    }
  }
}