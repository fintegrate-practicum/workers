import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/TasksService';
import { RabbitPublisherService } from 'src/rabbit-publisher/rabbit-publisher.service';


@Controller('tasks')
export class TasksController {
  constructor(
    private readonly _taskService: TasksService,
    private readonly rabbitPublisherService: RabbitPublisherService,
  ) {}

  @Post('/manager/task')
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return this._taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  
}
