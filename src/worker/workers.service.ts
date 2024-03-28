import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schemes/Employee.entity';

@Injectable()
export class WorkersService {
  constructor(@InjectModel('User') private readonly _EmployeeModel: Model<Employee>) {}

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this._EmployeeModel(Employee);
    return await newEmployee.save();
  }

  async findAll(page = 1, limit = 10): Promise<{ Employee: Employee[], total: number }> {
    const skip = (page - 1) * limit;
    const Employee = await this._EmployeeModel.find().skip(skip).limit(limit).exec();
    const total = await this._EmployeeModel.countDocuments();
    return { Employee, total };
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this._EmployeeModel.findById(id).exec();
  }

  async updateEmployee(id: string, Employee: Employee): Promise<Employee> {
    return await this._EmployeeModel.findByIdAndUpdate(id, Employee, { new: true }).exec();
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this._EmployeeModel.findByIdAndDelete(id).exec();
  }
}
