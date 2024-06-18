import { Module, forwardRef } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';
import { Task, TaskSchema } from 'src/schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User, UserSchema } from 'src/schemas/user.entity';
import { WorkersService } from 'src/worker/services/workers.service';
import { Employee, EmployeeSchema } from 'src/schemas/employee.entity';
import { UsersService } from 'src/user/services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/user/module/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [
    TasksService,
    Task,
    UsersService,
    RabbitPublisherService,
    WorkersService,
  ],
  controllers: [TasksController],
})
export class TasksModule {}
