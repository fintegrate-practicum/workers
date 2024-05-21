import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Put,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { User } from 'src/schemas/user.entity';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
    return this.workersService.findAllByBusinessId(businessId);
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

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: User) { 
    this.workersService.updateUser(id, data);
  }  
}
