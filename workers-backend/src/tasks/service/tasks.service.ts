import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
@Injectable()
export class TasksService {
  
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async getAllManagerTasks(
    businessId: Types.ObjectId,
    managerId: string,
  ): Promise<Task[]> {
    return await this.taskModel.find({ businessId } && { managerId }).exec();
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel(task);
    try {
      return await newTask.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateTask(
    taskId: string,
    task: UpdateTaskManagerDto | UpdateTaskEmployeeDto,
  ): Promise<Task> {
    try {
      const updatedTask = await this.taskModel.findOneAndUpdate(
        { _id: taskId },
        task,
        { new: true },
      );

      if (!updatedTask) {
        throw new NotFoundException(`Task with ID ${taskId} not found`);
      }

      return updatedTask;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTask(taskId: string): Promise<Task> {
    const deletedTask = await this.taskModel.findOneAndDelete({ _id:taskId });

    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    return deletedTask;
  }
}
