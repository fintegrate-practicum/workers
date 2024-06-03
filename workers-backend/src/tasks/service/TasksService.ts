import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { WorkersService } from 'src/worker/services/workers.service'; 
// import { WorkersService } from 'src/worker/workers.service';
import { Employee } from 'src/schemas/employee.entity';


@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    // @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly rabbitPublisherService: RabbitPublisherService,
    private readonly WorkersService: WorkersService

  ) { }

  async createTask(task: CreateTaskDto) {
    const users = await this.WorkersService.findAll("1");
    const foundUser: Employee | undefined = users.find((user: Employee) => user.userId === task.employeeId);

    if (foundUser) {
      console.log('User found:', foundUser);
    } else {
      console.log('User not found.');
    }

    const manager = await this.WorkersService.findAll("1");
    const foundManager: Employee | undefined = users.find((user: Employee) => user.userId === task.employeeId);

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
      pattern: 'message_exchange',
      data: {
        to: 'efrat1574@gmail.com',
        subject: newTask.taskName,
        type: 'email',
        kindSubject: 'newTask',
        name: foundUser.nameEmployee,
        description: newTask.description,
        date: newTask.targetDate,
        managerName: foundManager.nameEmployee,
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
