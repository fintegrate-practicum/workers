import { Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';
import { AuthGuard } from "@nestjs/passport";

@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Post('/manager/task')
  @UseGuards(AuthGuard("jwt"))
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return this._taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}


