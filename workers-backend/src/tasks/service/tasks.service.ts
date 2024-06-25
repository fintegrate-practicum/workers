import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { UserService } from 'src/user/services/users.service';
import { User } from 'src/schemas/user.entity';
import { Message } from 'src/interface/message.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly usersService: UserService,
  ) {}

  public readonly logger = new Logger(TasksService.name);
  async getAllTasks(managerId: string): Promise<Task[]> {
    return await this.taskModel.find({ managerId }).exec();
  }
  async createTask(task: CreateTaskDto) {
    const employees = await Promise.all(
      task.employee.map((id) =>
        this.usersService.findOneByUserId(id.toString()),
      ),
    );
    const manager = await this.usersService.findOneByUserId(task.managerId);

    const nonExistentEmployees = employees.filter((user) => !user);
    if (nonExistentEmployees.length > 0) {
      this.logger.log('One or more employees not found.');
      throw new Error('One or more employees not found');
    } else {
      this.logger.log('All employees found:', employees);
    }

    if (!manager) {
      this.logger.log('Manager not found.');
      throw new Error('Manager not found');
    } else {
      this.logger.log('Manager found:', manager);
    }

    const newTask = new this.taskModel(task);

    try {
      await newTask.save();
      this.logger.log('Task saved successfully.');

      await Promise.all(
        employees.map((user) => {
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
          return this.rabbitPublisherService.publishMessageToCommunication(
            message,
          );
        }),
      );

      this.logger.log('Messages published');
    } catch (error) {
      this.logger.error('Error creating task or sending messages', error);
      throw error;
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
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId });
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return deletedTask;
  }
}
