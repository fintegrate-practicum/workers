import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { Task } from '../../schemas/task.entity';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';
import { User } from 'src/schemas/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) {}

  async createTask(task: CreateTaskDto) {
    // const user= await this.userModel.findById(task.employeeId);
    // if (!user) {
    //   console.error('Employee not found');
    // }

    
    async function findUserByTask(task: CreateTaskDto): Promise<User | null> {
      try {
        const user = await this.userModel.findOne({ userId: task.employeeId });
        return user;
      } catch (error) {
        console.error('Error finding user:', error);
        return null;
      }
    }
    
    const user = await findUserByTask(task);
    if (!user) {
      console.error('Employee not found');
    }
    




    const manager = await this.userModel.findById(task.managerId);
    if (!manager) {
      console.error('manager not found');
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
        name: user.userName,
        description: newTask.description,
        date: newTask.targetDate,
        managerName: manager.userName,
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
