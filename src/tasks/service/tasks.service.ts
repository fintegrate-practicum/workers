import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { UserService } from 'src/user/services/users.service';
import { Message } from 'src/interface/message.interface';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly usersService: UserService,
  ) { }

  public readonly logger = new Logger(TasksService.name);
  async getAllTasks(managerId: string): Promise<Task[]> {
    if (!managerId) {
      this.logger.log('managerId was not provided');
      throw new BadRequestException('managerId is required');
    }
    return await this.taskModel.find({ managerId }).exec();
  }
  async createTask(task: CreateTaskDto) {
    if (!task) {
      this.logger.error('Invalid task data');
      throw new BadRequestException(' task is required');
    }

    const employees = await Promise.all(
      task.employee.map((id) =>

        this.usersService.findOneByUserId(id.toString()),
      ),
    );
    const manager = await this.usersService.findOneByUserId(task.managerId);

    const nonExistentEmployees = employees.filter((user) => !user);
    if (nonExistentEmployees.length > 0) {
      this.logger.log('One or more employees not found.');
      throw new NotFoundException('One or more employees not found')
    }

    if (!manager) {
      this.logger.log('Manager not found.');
      throw new NotFoundException('Manager not found');
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
      throw new InternalServerErrorException('Failed to create task');
    }
  }

  async updateTask(
    taskId: string,
    task: UpdateTaskManagerDto | UpdateTaskEmployeeDto,
  ): Promise<Task> {
    if (!taskId || !task) {
      this.logger.error('Invalid update task data');
      throw new BadRequestException('Invalid update task data');
    }
    const updatedTask = await this.taskModel.findOneAndUpdate({ _id: taskId }, task, { new: true },);
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return updatedTask;

  }

  async deleteTask(taskId: string): Promise<Task> {
    if (!taskId) {
      throw new BadRequestException('taskId is required')
    }
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId });
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return deletedTask;
  }
}