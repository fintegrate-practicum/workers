import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';

@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(worker);
    return await newEmployee.save();
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

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id).exec();
  }

  async activateEmployee(id: string): Promise<Employee> {
    try {
      // Find the employee by id and update their 'active' status to true
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate(id, { active: true }, { new: true })
        .exec();

      if (!updatedEmployee) {
        throw new Error('Employee not found');
      }

      return updatedEmployee;
    } catch (error) {
      // Handle the error appropriately
      console.error('Error activating employee:', error);
      throw error; // Re-throw the error if you want it to propagate
    }
  }
}
