import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation,  } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
    return this.workersService.findAllByBusinessId(businessId);
  }

  @ApiOperation({ summary: 'Activate an employee' })
  @Post(':id/activate')
  async activateEmployee(@Param('id') id: string): Promise<Employee> {
    try {
      const employee = await this.workersService.activateEmployee(id);
  if (!employee) {
        throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
      }
      employee.active = true;
      return employee;
    } catch (error) {
      console.error('Error activating employee:', error.message);
      throw new HttpException(error.message, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Get(':id')
  getWorker(@Param('id') id: string) {
    return this.workersService.getEmployee(id);
  }

  @Get('data')
  @UseInterceptors(TransformDataStructure)
  async getData(@Body() req: Request, @Body() res: Response): Promise<void> {
    res.json({ message: 'Original data' });
  }
}
