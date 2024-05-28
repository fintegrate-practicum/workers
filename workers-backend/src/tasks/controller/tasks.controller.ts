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

  @Get('/manager/:businessId/:managerId')
  async getAllManagerTasks(
    @Param('businessId') businessId: string,
    @Param('managerId') managerId: string,
  ) {
    try {
      const tasks = await this._taskService.getAllManagerTasks(
        businessId,
        managerId,
      );
      return tasks;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
