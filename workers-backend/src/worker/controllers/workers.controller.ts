import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { promises } from 'readline';
import { workerValidationsSchema } from '../validations/worker.validations.schema';

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

  @Get('getAllWorkers')
  async get(@Param('id')id:string):Promise<Employee[]>{
    const result=await this.workersService.findAllByBusinessId(id);
    return result;
  }

  @Post('createNewWorker')
  async create(@Body(new ValidationPipe()) requestBody:workerValidationsSchema):Promise<Employee>{
    const result=await this.workersService.createEmployee(requestBody);
    return result
  }

}
