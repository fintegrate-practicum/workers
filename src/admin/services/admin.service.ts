import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/schemes/employee.entity'; // Assuming Employee entity is defined
   @Injectable()
export class AdminService {
    constructor(@InjectModel('Employee') private readonly EmployeeModel: Model<Employee>) {}

    async findAll(page = 1, limit = 10): Promise<{ employees: Employee[], total: number }> {
      const skip = (page - 1) * limit;
      const employees = await this.EmployeeModel.find().skip(skip).limit(limit).exec();
      const total = await this.EmployeeModel.countDocuments();
      return { employees, total };
    }

    async getEmployee(id: string): Promise<Employee> {
      return await this.EmployeeModel.findById(id).exec();
    }
}
