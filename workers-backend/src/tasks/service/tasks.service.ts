import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) {}

  async createTask(task: CreateTaskDto): Promise<Task> {
    const taskToSave = {
      ...task,
      targetDate: task.targetDate,
      completionDate: task.completionDate ? task.completionDate : undefined,
    };

    const newTask = new this.taskModel(taskToSave);

    const message = {
      pattern: 'message_exchange',
      data: {
        to: newTask.emailEmployee,
        message: newTask,
      },
    };

    try {
      await this.rabbitPublisherService.publishMessageToCommunication(message);
      return await newTask.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
