import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { UsersService } from 'src/user/services/users.service';
import { User } from 'src/schemas/user.entity';
import { Message } from 'src/interface/message.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly usersService: UsersService,
  ) {}

  public readonly logger = new Logger(TasksService.name);

  async createTask(task: CreateTaskDto) {
    const [user, manager] = await Promise.all([
      this.usersService.findOneByUserId(task.employeeId),
      this.usersService.findOneByUserId(task.managerId),
    ]);

    if (!user) {
      throw new Error('User not found');
    } else {
      this.logger.log('User found:', user);
    }

    if (!manager) {
      throw new Error('Manager not found');
    } else {
      this.logger.log('manager found:', manager);
    }

    const taskToSave = {
      ...task,
      targetDate: task.targetDate,
      completionDate: task.completionDate ? task.completionDate : undefined,
    };

    const newTask = new this.taskModel(taskToSave);

    const message: Message = {
      pattern: 'message_exchange',
      data: {
        to: user.userEmail,
        subject: newTask.taskName,
        type: 'email',
        kindSubject: 'newTask',
        name: user.userName,
        description: newTask.description,
        date: newTask.targetDate,
        managerName: manager.userName,
      },
    };

    try {
      await newTask.save();
      this.logger.log('message published');
      return await this.rabbitPublisherService.publishMessageToCommunication(
        message,
      );
    } catch (error) {
      this.logger.log('error');
    }
  }
}
