import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Post,
  ValidationPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { promises } from 'readline';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { error } from 'console';

@Controller('workers')
export class WorkersController {
  findAll(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly workersService: WorkersService) { }

  // @Get()
  // async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
  //   return this.workersService.findAllByBusinessId(businessId);
  // }

  @Get('employee/:id')
  getWorker(@Param('id') id: string) {
    return this.workersService.getEmployee(id);
  }

  @Get('data')
  @UseInterceptors(TransformDataStructure)
  async getData(@Body() req: Request, @Body() res: Response): Promise<void> {
    res.json({ message: 'Original data' });
  }

  @Get('company/:companyId')
  async get(@Param('companyId') id: string): Promise<Employee[]> {
    const result = await this.workersService.findAllByBusinessId(id);
    return result;
  }

  @ApiOperation({ summary: 'Add a new employee' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        businessId: { type: 'string' },
        userId: { type: 'string' },
        workerCode: { type: 'string' },
        createdBy: { type: 'string' },
        roleId: { type: 'string' },
        position: { type: 'string' }
      },
    },
  })

  @Post('')
  async create(@Body(new ValidationPipe({ exceptionFactory: (errors) => new HttpException(errors, HttpStatus.BAD_REQUEST) })) requestBody: workerValidationsSchema): Promise<Employee> {
    try {
      const workerCode = this.generateUniqueNumber()
      requestBody.workerCode = workerCode;
      const result = await this.workersService.createEmployee(requestBody);
      return result
    }
    catch (error) {
      if (error instanceof HttpException)
        throw error;
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  generateUniqueNumber(): string {
    const timestamp = new Date().getTime(); // Get current timestamp
    const random = Math.floor(Math.random() * 10000); // Generate random number between 0 and 9999
    return `${timestamp}${random}`; // Concatenate timestamp and random number
  }
}
