import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
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

  @Put('employee/task/:id')
  async updateTaskEmployee(
    @Param('id') taskId: string,
    @Body() updatedTask: UpdateTaskEmployeeDto,
  ) {
    try {
      return this._taskService.updateTaskEmployee(taskId, updatedTask);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('manager/task/:id')
  async updateTaskManager(
    @Param('id') taskId: string,
    @Body() updatedTask: UpdateTaskManagerDto,
  ) {
    try {
      return this._taskService.updateTaskManager(taskId, updatedTask);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete('/manager/task/:id')
  async deleteTask(@Param('id') taskId: string) {
    try {
      return this._taskService.deleteTask(taskId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
