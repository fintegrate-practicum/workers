import { Module } from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { WorkersController } from '../controllers/workers.controller';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}
