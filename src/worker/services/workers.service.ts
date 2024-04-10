// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Employee } from '../../schemas/employee.entity';


// @Injectable()
// export class WorkersService {
//   constructor(@InjectModel('Employee') private readonly EmployeeModel: Model<Employee>) {}

//   async createEmployee(worker: Employee): Promise<Employee> {
//     const newEmployee = new this.EmployeeModel(worker);
//     return await newEmployee.save();
//   }

//   async findAllByBusinessId(businessId: string, page = 1, limit = 10): Promise<{ employees: Employee[], total: number }> {
//       const skip = (page - 1) * limit;
//       const query = { businessId };
  
//       const employees = await this.EmployeeModel.find(query).skip(skip).limit(limit).exec();
//       const total = await this.EmployeeModel.countDocuments(query);
  
//       return { employees, total };
//   }

//   async getEmployee(id: string): Promise<Employee> {
//     return await this.EmployeeModel.findById(id).exec();
//   }

//   async updateEmployee(id: string, updatedEmployee: Employee): Promise<Employee> {
//     return await this.EmployeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true }).exec();
//   }

//   async deleteEmployee(id: string): Promise<Employee> {
//     return await this.EmployeeModel.findByIdAndDelete(id).exec();
//   }
// }



import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from '../../schemas/employee.entity';

@Injectable()
export class WorkersService {
  constructor(@InjectModel('Employee') private readonly employeeModel: Model<Employee>) {}

  async createEmployee(worker: Employee): Promise<Employee> {
    const newEmployee = new this.employeeModel(worker);
    return await newEmployee.save();
  }

  async findAllByBusinessId(businessId: string, page = 1, limit = 10): Promise<Employee[]> {
    const skip = (page - 1) * limit;
    const query = { businessId };

    const employees = await this.employeeModel.find(query).skip(skip).limit(limit).exec();
    return employees;
  }

  async getEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findById(id).exec();
  }

  async updateEmployee(id: string, updatedEmployee: Employee): Promise<Employee> {
    return await this.employeeModel.findByIdAndUpdate(id, updatedEmployee, { new: true }).exec();
  }

  async deleteEmployee(id: string): Promise<Employee> {
    return await this.employeeModel.findByIdAndDelete(id).exec();
  }
}