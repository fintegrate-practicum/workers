import {
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  Put,
  Delete,
  Param,
  Headers,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) { }

  @Get('/manager/:businessId/:managerId')
  async getAllManagerTasks(@Param('managerId') managerId: string) {
    return await this._taskService.getAllTasks(managerId);
  }

  @Post('/manager/task')
  async createTask(@Body() task: CreateTaskDto) {
    return await this._taskService.createTask(task);
  }

  @Put('task/:id')
  async updateTask(
    @Param('id') taskId: string,
    @Body() updatedTask: UpdateTaskManagerDto | UpdateTaskEmployeeDto,
    @Headers('employee-type') employeeType: string,
  ) {
    if (employeeType === 'manager') {
      return await this._taskService.updateTask(taskId, updatedTask as UpdateTaskManagerDto);
    } else if (employeeType === 'employee') {
      return await this._taskService.updateTask(taskId, updatedTask as UpdateTaskEmployeeDto);
    } else {
      throw new BadRequestException('Invalid role type');
    }
  }

  @Delete('/manager/task/:id')
  async deleteTask(@Param('id') taskId: string) {
    return await this._taskService.deleteTask(taskId);
  }
}
