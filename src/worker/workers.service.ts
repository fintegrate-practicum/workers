import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schemes/Employee.entity';

@Injectable()
export class WorkersService {
  constructor(@InjectModel('Employee') private readonly _employeeModel: Model<Employee>) {}

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this._employeeModel(worker);
    return await newEmployee.save();
  }

  async findAll(page = 1, limit = 10): Promise<{ employees: Employee[], total: number }> {
    const skip = (page - 1) * limit;
    const employees = await this._employeeModel.find().skip(skip).limit(limit).exec();
    const total = await this._employeeModel.countDocuments();
    return { employees, total };
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this._employeeModel.findById(id).exec();
  }

  async updateEmployee(id: string, updatedEmployee: Employee): Promise<Employee> {
    return await this._employeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true }).exec();
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this._employeeModel.findByIdAndDelete(id).exec();
  }
}
