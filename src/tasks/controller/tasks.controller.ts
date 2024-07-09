import {
  Body,
  Controller,
  Post,
  BadRequestException,
  InternalServerErrorException,
  Get,
  Put,
  Delete,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { Types } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) { }

  @Get('/manager/:businessId/:managerId')
  async getAllManagerTasks(@Param('managerId') managerId: string) {
    try {
      const tasks = await this._taskService.getAllTasks(managerId);
      return tasks;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
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

  @Put('task/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updatedTask: UpdateTaskManagerDto | UpdateTaskEmployeeDto,
    @Headers('employee-type') employeeType: string,
  ) {
    try {
      if (employeeType === 'manager') {
        return this._taskService.updateTask(
          taskId,
          updatedTask as UpdateTaskManagerDto,
        );
      } else if (employeeType === 'employee') {
        return this._taskService.updateTask(
          taskId,
          updatedTask as UpdateTaskEmployeeDto,
        );
      } else {
        throw new BadRequestException('Invalid role type');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  @Delete('/manager/task/:id')
  async deleteTask(@Param('id') taskId: string) {
    try {
      return this._taskService.deleteTask(taskId);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}


