
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Request, Response } from 'express';

import {
    Body,Controller, Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
    Query
  } from '@nestjs/common';
  import { WorkersService  } from '../worker/services/workers.service'
  import { AuthGuard } from '@nestjs/passport';
import { Employee } from 'src/schemas/employee.entity';


@ApiBearerAuth()
@ApiTags('workers')
@Controller('workers')
export class WorkersController {
    constructor(private readonly workersService: WorkersService) {}
    @Get()
    @ApiBearerAuth()
    @ApiTags('workers')
    @UseInterceptors(TransformDataStructure)
    async getData(req: Request, res: Response): Promise<void> {
   
      
        res.json({ message: 'Original data' });
    }

    @Get()
    async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
      return this.workersService.findAllByBusinessId(businessId);
    }
    

    @Get(':id')
    getWorker(@Param('id') id: string) {
      return this.workersService.getEmployee(id);
    }
  
  
    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body('worker') worker: Employee): Promise<void> {
      this.workersService.createEmployee(worker);
    }
    
}


