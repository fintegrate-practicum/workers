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
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'; // Import Swagger decorators
import { workerValidationsSchema } from '../validations/worker.validations.schema';
import { Logger } from '@nestjs/common';
import { AuthGuard } from "@nestjs/passport";
@ApiTags('Workers')
@Controller('workers')
export class WorkersController {
  private readonly logger = new Logger(WorkersController.name);

  constructor(private readonly workersService: WorkersService) {}

  @Get()
  @UseGuards(AuthGuard("jwt"))
  async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
    return this.workersService.findAll(businessId);
  }
  
  @ApiOperation({ summary: 'Activate an employee' })
  @Post(':id/activate')
  @UseGuards(AuthGuard("jwt"))
  async activateEmployee(@Param('id') id: string): Promise<Employee> {
    try {
      const employee = await this.workersService.activateEmployee(id);
      if (!employee) {
        throw new HttpException('employee not found', HttpStatus.NOT_FOUND);
      }

      return employee;
    } catch (error) {
      console.error('Error activating employee:', error.message);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard("jwt"))
  getWorker(@Param('id') id: string) {
    return this.workersService.getEmployee(id);
  }

  @Get('data')
  @UseGuards(AuthGuard("jwt"))
  @UseInterceptors(TransformDataStructure)
  async getData(@Body() req: Request, @Body() res: Response): Promise<void> {
    res.json({ message: 'Original data' });
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard("jwt"))
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
        code: { type: 'string' },
        createdBy: { type: 'string' },
        updatedBy: { type: 'string' },
        role: { type: 'string' },
      },
    },
  })

  @Post('')
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          return new HttpException(
            { message: 'Validation error', error: errors },
            HttpStatus.BAD_REQUEST
          );
        },
      })
    )
    requestBody: workerValidationsSchema
  ): Promise<Employee> {
    try {
      const result = await this.workersService.createEmployee(requestBody);
      this.logger.log('Employee created successfully');
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      this.logger.error('Error creating employee:', error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}

