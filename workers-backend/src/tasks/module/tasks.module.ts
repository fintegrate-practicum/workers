import { Module } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { TasksController } from '../controller/tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User, UserSchema } from 'src/schemas/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: TaskSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [TasksService, RabbitPublisherService],
  controllers: [TasksController],
})
export class TasksModule {}
