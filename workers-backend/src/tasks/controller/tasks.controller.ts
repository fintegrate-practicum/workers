import { Body, Controller, Post, BadRequestException, UseGuards } from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('/manager/task')
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return this._taskService.createTask(task);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
function AuthGuard(arg0: string): Function | import("@nestjs/common").CanActivate {
  throw new Error('Function not implemented.');
}

