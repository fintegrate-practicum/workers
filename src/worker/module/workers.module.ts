import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkersService } from '../services/workers.service';
import { WorkersController } from '../controllers/workers.controller';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Employee', schema: EmployeeSchema }]),
  ],
  providers: [WorkersService],
  controllers: [WorkersController],
})
export class WorkersModule {}


