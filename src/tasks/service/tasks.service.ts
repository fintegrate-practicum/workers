import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from '../../rabbit-publisher/rabbit-publisher.service';
import { UserService } from '../../user/users.service';
import { Message } from '../../interface/message.interface';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly usersService: UserService,
  ) {}

  public readonly logger = new Logger(TasksService.name);
  async getAllTasks(managerId: string): Promise<Task[]> {
    if (!managerId) {
      this.logger.log('managerId was not provided');
      throw new BadRequestException('managerId is required');
    }
    return await this.taskModel.find({ managerId }).exec();
  }
  async getAllTasksForEmployee(
    employeeId: string,
    businessId: string,
  ): Promise<Task[]> {
    if (!employeeId || !businessId) {
      throw new BadRequestException('employeeID and businessID is required');
    }
    const tasksByBusiness = await this.taskModel.find({ businessId }).exec();
    const tasksByBusinessByEmployee = tasksByBusiness.filter((task) =>
      task.employee.includes(new Types.ObjectId(employeeId)),
    );
    return tasksByBusinessByEmployee;
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
      throw new NotFoundException('One or more employees not found');
    }

    if (!manager) {
      this.logger.log('Manager not found.');
      throw new NotFoundException('Manager not found');
    }

    try {
      const newTask = await this.taskModel.create(task);
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
      return newTask;
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
    const updatedTask = await this.taskModel.findOneAndUpdate(
      { _id: taskId },
      task,
      { new: true },
    );
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return updatedTask;
  }

  async deleteTask(taskId: string): Promise<Task> {
    if (!taskId) {
      throw new BadRequestException('taskId is required');
    }
    const deletedTask = await this.taskModel.findOneAndDelete({ _id: taskId });
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }
    return deletedTask;
  }
  async checkTasksForReminder(): Promise<void> {
    const tasks = await this.taskModel.find();
    if (!tasks.length) {
      this.logger.log('No tasks found.');
      return;
    }
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    for (const task of tasks) {
      if (!task.completionDate) {
        this.logger.error(`Task ${task._id} has no completion date.`);
        continue;
      }
      const taskDate = new Date(task.completionDate);
      if (
        taskDate.toLocaleDateString('en-GB') ===
        tomorrow.toLocaleDateString('en-GB')
      ) {
        const employees = await Promise.all(
          task.employee?.map(async (id) => {
            if (!id) {
              this.logger.error(`Employee ID is missing for task ${task._id}`);
              return null;
            }
            const user = await this.usersService.findOneByUserId(id.toString());
            if (!user) {
              this.logger.error(`Employee with ID ${id} not found.`);
            }
            return user;
          }),
        );
        const validEmployees = employees.filter((user) => user !== null);
        if (validEmployees.length === 0) {
          this.logger.error(`No valid employees found for task ${task._id}`);
          continue;
        }
        const admin = await this.usersService.findOneByUserId(task.managerId);
        if (!admin) {
          this.logger.error(
            `Manager with ID ${task.managerId} not found for task ${task._id}`,
          );
          continue;
        }
        await Promise.all(
          validEmployees.map(async (user) => {
            try {
              const message: Message = {
                pattern: 'message_exchange',
                data: {
                  to: user.userEmail,
                  subject: task.description,
                  type: 'email',
                  kindSubject: 'taskReminder',
                  name: user.userName,
                  description:
                    'Reminder for a task with a due date of tomorrow',
                  date: task.completionDate,
                  managerName: admin.userName,
                },
              };
              await this.rabbitPublisherService.publishMessageToCommunication(
                message,
              );
            } catch (error) {
              this.logger.error(
                `Failed to send reminder to ${user.userName} for task ${task._id}:`,
                error,
              );
            }
          }),
        );
      }
    }
  }

  @Cron('0 0 * * *')
  async handleCron() {
    await this.checkTasksForReminder();
  }
}
