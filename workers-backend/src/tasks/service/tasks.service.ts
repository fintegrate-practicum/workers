import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async getAllManagerTasks(
    businessId: string,
    managerId: string,
  ): Promise<Task[]> {
    return await this.taskModel.find({ businessId } && { managerId }).exec();
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const taskToSave = {
      ...task,
    };

    const newTask = new this.taskModel(taskToSave);

    try {
      return await newTask.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
