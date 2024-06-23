import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { Employee } from 'src/schemas/employee.entity';
import { User, UserSchema } from 'src/schemas/user.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,

  ) {}

  async findOneByUserId(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findById(userId).exec();
    console.log(user);
    
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

}



