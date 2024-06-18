import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { Employee } from 'src/schemas/employee.entity';
import { User, UserSchema } from 'src/schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async findOneByUserId(userId: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ userId }).exec();
    return user;
  }
}
