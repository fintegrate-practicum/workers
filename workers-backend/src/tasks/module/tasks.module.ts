import { Module } from '@nestjs/common';
import { TasksService } from '../service/TasksService';
import { TasksController } from '../controller/tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User, UserSchema } from 'src/schemas/user.entity';
import { WorkersService } from 'src/worker/services/workers.service'; 
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },

    ]),
  ],
  providers: [TasksService, RabbitPublisherService,WorkersService],
  controllers: [TasksController],
})
export class TasksModule {}
