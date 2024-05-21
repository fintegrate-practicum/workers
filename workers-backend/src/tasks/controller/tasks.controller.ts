import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Get('/manager/:managerId/all-tasks')
  async getAllTasks(@Param('managerId') managerId: string) {
    const tasks = await this._taskService.getAllTasks(managerId);
    return tasks;
  }

  @Post('/manager/task')
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return this._taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
