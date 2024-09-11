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
  UseGuards,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { CreateTaskDto } from '../../dto/createTask.dto';
import { TasksService } from '../service/tasks.service';
import { UpdateTaskEmployeeDto } from '../../dto/updateTaskEmployee.dto';
import { UpdateTaskManagerDto } from '../../dto/updateTaskManager.dto';
import { ApiTags } from '@nestjs/swagger';
import { Role, Roles, RolesGuard } from 'fintegrate-auth';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly _taskService: TasksService) {}

  @Get('/manager/:businessId/:managerId')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async getAllManagerTasks(@Param('managerId') managerId: string) {
    return await this._taskService.getAllTasks(managerId);
  }

  @Get('/employee/:businessId/:employeeId')
  async getAllEmployeeTasksByBusinessID(
    @Param('businessId') businessId: string,
    @Param('employeeId') employeeId: string,
  ) {
    return await this._taskService.getAllTasksForEmployee(
      employeeId,
      businessId,
    );
  }

  @Post('/manager/task')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async createTask(@Body() task: CreateTaskDto) {
    return await this._taskService.createTask(task);
  }

  @Put('task/:id')
  @Roles(Role.Admin, Role.Worker)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async updateTask(
    @Param('id') taskId: string,
    @Body() updatedTask: UpdateTaskManagerDto | UpdateTaskEmployeeDto,
    @Headers('employee-type') employeeType: string,
  ) {
    if (employeeType === 'manager') {
      return await this._taskService.updateTask(
        taskId,
        updatedTask as UpdateTaskManagerDto,
      );
    } else if (employeeType === 'employee') {
      return await this._taskService.updateTask(
        taskId,
        updatedTask as UpdateTaskEmployeeDto,
      );
    } else {
      throw new BadRequestException('Invalid role type');
    }
  }

  @Delete('/manager/task/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async deleteTask(@Param('id') taskId: string) {
    return await this._taskService.deleteTask(taskId);
  }

  @Get('open-by-employee/:companyId')
  async getTasksOpenByEmployee(@Param('companyId') companyId: string, @Res() response): Promise<{ employeeId: string, count: number }[]> {
      const result = await this._taskService.getTasksOpenByEmployee(companyId);
      return response.status(HttpStatus.OK).send(result);
  }

}
