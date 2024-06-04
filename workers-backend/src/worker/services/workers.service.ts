import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { User } from 'src/schemas/user.entity';
import { promises } from 'dns';

@Injectable()
export class WorkersService {

  private readonly logger = new Logger(WorkersService.name);

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(worker);
    return await newEmployee.save()
  }

  async findAllByBusinessId(
    businessId: string,
    page = 1,
    limit = 10,
  ): Promise<Employee[]> {
    const skip = (page - 1) * limit;
    const query = { businessId };

    const employees = await this.employeeModel
      .find(query)
      .skip(skip)
      .limit(limit)
      .exec();
    return employees;
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id).exec();
  }

  async updateEmployee(
    id: string,
    updatedEmployee: Employee,
  ): Promise<Employee> {
    return await this.employeeModel
      .findByIdAndUpdate(id, updatedEmployee, { new: true })
      .exec();

  }
  async updateUser(
    id: string,
    updateUser: User,
  ): Promise<User> {
    if (updateUser.phone.length < 9)
      throw new HttpException("invalid phone", HttpStatus.BAD_REQUEST);
    if (updateUser.name.length < 3)
      throw new HttpException('invalid name', HttpStatus.BAD_REQUEST)
    if (updateUser.address.city.length < 3)
      throw new HttpException(
        'invalid address city name',
        HttpStatus.BAD_REQUEST,
      );
    if (updateUser.address.street.length < 3)
      throw new HttpException(
        'invalid address-street-name',
        HttpStatus.BAD_REQUEST,
      );
    if (updateUser.address.num < 1)
      throw new HttpException('invalid address-num', HttpStatus.BAD_REQUEST);
    const updatedUser = await this.userModel
      .findOneAndUpdate({ id }, updateUser, { new: true })
      .exec();

    if (!updatedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return updateUser;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id).exec();
  }



}



