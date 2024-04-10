import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from 'src/schemas/employee.entity'; // Assuming Employee entity is defined
import { WorkersModule } from 'src/worker/module/workers.module';

@Injectable()
export class AdminService {
    constructor(@InjectModel('Employee') private readonly EmployeeModel: Model<Employee>) {}

    async findAllByBusinessId(businessId: string, page = 1, limit = 10): Promise<{ employees: Employee[], total: number }> {
        const skip = (page - 1) * limit;
        const query = { businessId };

        const employees = await this.EmployeeModel.find(query).skip(skip).limit(limit).exec();
        const total = await this.EmployeeModel.countDocuments(query);
        return { employees, total };
    }

    async getEmployee(id: string): Promise<Employee> {
        return await this.EmployeeModel.findById(id).exec();
    }
}
