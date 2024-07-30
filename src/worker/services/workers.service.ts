import { BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(worker: workerValidationsSchema): Promise<Employee> {
    if (!worker)
      throw new BadRequestException('Request body is required');
    try {
      const newEmployee =  this.employeeModel.create(worker);
      const workerCode = this.generateUniqueNumber();
      (await newEmployee).code = workerCode;
      return  newEmployee;   
    } catch (error) {
      throw new HttpException(
        'Error creating employee',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAll(businessId: string): Promise<Employee[]> {
    if (!businessId)
      throw new BadRequestException('businessId is required');
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

  async findAllByBusinessId(businessId: string): Promise<Employee[]> {
    try {
      const employees = await this.employeeModel.find({ businessId }).exec();
      return employees;
    } catch (error) {
      throw new HttpException(
        'Error fetching employees by business ID',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getEmployeeByUserId(userId: string): Promise<Employee> {
  if (!userId) {
    throw new BadRequestException('ID is required');
  }
  try {
    console.log('Fetching employee with userId:', userId);
    const employee = await this.employeeModel.findOne({ userId }).exec();
    if (!employee) {
      console.warn('Employee not found with userId:', userId);
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    return employee;
  } catch (error) {
    console.error('Error fetching employee:', error);
    if (error.status === HttpStatus.NOT_FOUND) {
      throw error;
    }
    throw new HttpException(
      'Error fetching employee',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
async deleteEmployee(id: string): Promise<Employee> {
  try {
    this.logger.log(`Attempting to delete employee with id: ${id}`);
    const employee = await this.employeeModel.findByIdAndDelete(id);
    if (!employee) {
      this.logger.warn(`Employee not found with id: ${id}`);
      throw new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }
    this.logger.log(`Successfully deleted employee with id: ${id}`);
    return employee;
  } catch (error) {
    this.logger.error(`Error deleting employee: ${error.message}`);
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
    if (!id)
      throw new BadRequestException('ID is required');
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

async updateEmployeeByUserId(userId: string,updatedEmployee: Employee,): Promise<Employee> {
  if (!userId)
    throw new BadRequestException('ID is required');
  if (!updatedEmployee)
    throw new BadRequestException('User data is required');
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
}
