import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { UsersService } from 'src/user/services/users.service';
import { User } from 'src/schemas/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly UsersService: UsersService,
  ) {}

  async createTask(task: CreateTaskDto) {
    const users = await this.UsersService.findAll();
    const foundUser: User | undefined = users.find(
      (user: User) => user.userId === task.employeeId,
    );

    if (foundUser) {
      console.log('User found:', foundUser);
    } else {
      console.log('User not found.');
    }

    const foundManager: User | undefined = users.find(
      (user: User) => user.userId === task.managerId,
    );

    if (foundManager) {
      console.log('manager found:', foundManager);
    } else {
      console.log('manager not found.');
    }

    const taskToSave = {
      ...task,
      targetDate: task.targetDate,
      completionDate: task.completionDate ? task.completionDate : undefined,
    };

    const newTask = new this.taskModel(taskToSave);

    const message = {
      pattern: 'message_queue',
      data: {
        to: foundUser.userEmail,
        subject: newTask.taskName,
        type: 'email',
        kindSubject: 'newTask',
        name: foundUser.userName,
        description: newTask.description,
        date: newTask.targetDate,
        managerName: foundManager.userName,
      },
    };

    try {
      await this.rabbitPublisherService.publishMessageToCommunication(message);
      console.log('message published');

      return await newTask.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
