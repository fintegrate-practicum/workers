import { Injectable,Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../schemas/employee.entity';
@Injectable()
export class WorkersService {

  private readonly logger = new Logger(WorkersService.name)

  constructor(
    @InjectModel('Employee') private readonly employeeModel: Model<Employee>,
  ) {}

  async createEmployee(employee: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(employee);
    return await newEmployee.save();
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().exec();
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id).exec();
  }

  async updateEmployee(id: string, employee: Employee): Promise<Employee> {
    return await this.employeeModel
      .findByIdAndUpdate(id, employee, { new: true })
      .exec();
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id).exec();
  }
}
