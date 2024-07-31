import { Module } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';
import { Task, TaskSchema } from 'src/schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User, UserSchema } from 'src/schemas/user.entity';
import { WorkersService } from 'src/worker/services/workers.service';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [
    TasksService,
    Task,
    RabbitPublisherService,
    WorkersService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
