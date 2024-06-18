import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';
import { RoleEnum, workerValidationsSchema } from '../validations/worker.validations.schema';
@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}
  
  async createEmployee(worker: workerValidationsSchema): Promise<Employee> {
    try {
      const roleValue = RoleEnum[worker.role as unknown as keyof typeof RoleEnum];

      if (roleValue === undefined) {
        throw new HttpException(`Invalid role: ${worker.role}`, HttpStatus.BAD_REQUEST);
      }
      const newEmployee = new this.employeeModel({
        ...worker,
        role: roleValue,
      });
      const workerCode = this.generateUniqueNumber();
      newEmployee.code = workerCode;
      return await newEmployee.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new HttpException(
          { message: 'Validation error', error: error.errors },
          HttpStatus.BAD_REQUEST
        );
      } else {
        this.logger.error('Error creating employee:', error);
        throw new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
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

  async getEmployee(id: string): Promise<Employee> {
    try {
      const employee = await this.employeeModel.findById(id).exec();
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

  async updateEmployee(
    id: string,
    updatedEmployee: Employee,
  ): Promise<Employee> {
    try {
      const employee = await this.employeeModel
        .findByIdAndUpdate(id, updatedEmployee, { new: true })
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
}
