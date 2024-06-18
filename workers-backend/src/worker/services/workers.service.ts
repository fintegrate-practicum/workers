import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { User } from 'src/schemas/user.entity';
import { workerValidationsSchema } from '../validations/worker.validations.schema';

@Injectable()
export class WorkersService {

  private readonly logger = new Logger(WorkersService.name);

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
    @InjectModel('User') private readonly userModel: Model<User>
  ) { }



  async createEmployee(worker: workerValidationsSchema): Promise<Employee> {
    try {
      const newEmployee = new this.employeeModel(worker);
      const workerCode = this.generateUniqueNumber();
      newEmployee.workerCode = workerCode;
      return await newEmployee.save();
    } catch (error) {
      throw new HttpException(
        'Error creating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(businessId: string): Promise<Employee[]> {
    const query = { businessId };
    const employees = await this.employeeModel.find(query).exec();
    return employees;
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
  async updateUser(userId: string, updateUser: User): Promise<User> {
    if (updateUser.phone.length < 9)
      throw new HttpException('invalid phone', HttpStatus.BAD_REQUEST);
    if (updateUser.userName.length < 3)
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
      .findOneAndUpdate({ userId }, updateUser, { new: true })
      .exec();

    if (!updatedUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return updateUser;
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id).exec();
    try {
      const employee = await this.employeeModel.findByIdAndDelete(id).exec();
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      return employee;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error deleting employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  generateUniqueNumber(): string {
    const timestamp = new Date().getTime(); // Get current timestamp
    const random = Math.floor(Math.random() * 10000); // Generate random number between 0 and 9999
    return `${timestamp}${random}`; // Concatenate timestamp and random number
  }

  async activateEmployee(id: string): Promise<Employee> {
    try {
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate(id, { active: true }, { new: true })
        .exec();

      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }
      
      this.logger.log('The status will change successfully');
      return updatedEmployee;
    } catch (error) {
      console.error('Error activating employee:', error);
      throw error;
    }
  }
}



