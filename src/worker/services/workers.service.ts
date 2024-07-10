import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
// import { User } from 'src/schemas/user.entity';
@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);
  userModel;

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(worker: workerValidationsSchema): Promise<Employee> {
    try {
      const newEmployee = new this.employeeModel(worker);
      const workerCode = this.generateUniqueNumber();
      newEmployee.code = workerCode;
      return await newEmployee.save();   
    } catch (error) {
      throw new HttpException(
        'Error creating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(businessId: string): Promise<Employee[]> {
    if(!businessId)
      throw new HttpException('Business ID is required', HttpStatus.BAD_REQUEST); 
    try{
    const query = { businessId };
    const employees = await this.employeeModel.find(query).exec();
    return employees;
  }catch(error){
    throw new HttpException(
      'Error fetching employees',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
  }

  async findAllByBusinessId(businessId: string,page = 1,limit = 10,): Promise<Employee[]> {
    if(!businessId)
      throw new HttpException('Business ID is required', HttpStatus.BAD_REQUEST);
    try {
      const skip = (page - 1) * limit;
      const query = { businessId };
      const employees = await this.employeeModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .exec();
      return employees;
    } catch (error) {
      throw new HttpException(
        'Error fetching employees by business ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getEmployeeByUserId(userId: string): Promise<Employee> {
    if(!userId)
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    try {
      const employee = await this.employeeModel.findOne({ userId }).exec();
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      return employee;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error fetching employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  

  async updateEmployeeByUserId(userId: string,updatedEmployee: Employee,): Promise<Employee> {
    if(!userId)
      throw new HttpException('User ID is required', HttpStatus.BAD_REQUEST);
    try {
      const employee = await this.employeeModel
        .findOneAndUpdate({ userId }, updatedEmployee, { new: true })
        .exec();
      if (!employee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }
      return employee;
    } catch (error) {
      if (error.status === HttpStatus.NOT_FOUND) {
        throw error;
      }
      throw new HttpException(
        'Error updating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteEmployee(id: string): Promise<Employee> {
    if(!id)
      throw new HttpException('Employee ID is required', HttpStatus.BAD_REQUEST);
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
    if(!id)
      throw new HttpException('Employee ID is required', HttpStatus.BAD_REQUEST);
    try {
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate(id, { active: true }, { new: true })
        .exec();
      if (!updatedEmployee) {
        throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
      }

      this.logger.log('The status will change successfully');
      return updatedEmployee;
    } catch (error) {
      console.error('Error activating employee:', error);
      throw error;
    }
  }
}







