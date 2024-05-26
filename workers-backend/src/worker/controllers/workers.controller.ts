import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,  Delete,
 
 
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('workers')
@ApiBearerAuth()
@ApiTags('workers')

export class WorkersController {

  
 

  constructor(private readonly workersService: WorkersService) {}
  @ApiBearerAuth()
  @ApiTags('workers')
  @UseInterceptors(TransformDataStructure)
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

  @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body('worker') worker: Employee): Promise<void> {
      this.workersService.createEmployee(worker);
    }
}












 
 





   




  
  
    
  

    
