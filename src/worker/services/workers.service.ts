import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemes/Employee.entity';

@Injectable()
export class WorkersService {
  constructor(@InjectModel('Employee') private readonly EmployeeModel: Model<Employee>) {}

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this.EmployeeModel(worker);
    return await newEmployee.save();
  }
  
  async findAll(page = 1, limit = 10): Promise<{ employees: Employee[], total: number }> {
    const skip = (page - 1) * limit;
    const employees = await this.EmployeeModel.find().skip(skip).limit(limit).exec();
    const total = await this.EmployeeModel.countDocuments();
    return { employees, total };
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this.EmployeeModel.findById(id).exec();
  }

  async updateEmployee(id: string, updatedEmployee: Employee): Promise<Employee> {
    return await this.EmployeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true }).exec();
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.EmployeeModel.findByIdAndDelete(id).exec();
  }
}
