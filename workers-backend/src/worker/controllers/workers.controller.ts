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
        workerCode: { type: 'string' },
        createdBy: { type: 'string' },
        roleId: { type: 'string' },
        position: { type: 'string' },
      },
    },
  })

  @Post('')
  @UseGuards(AuthGuard("jwt"))
  async create(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          Logger.log('error validation! ' + errors);
          return new HttpException(errors, HttpStatus.BAD_REQUEST);
        },
      }),
    )
    requestBody: workerValidationsSchema,
  ): Promise<Employee> {
    try {
      const result = await this.workersService.createEmployee(requestBody);
      this.logger.log('good');
      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

function AuthGuard(arg0: string): Function | import("@nestjs/common").CanActivate {
  throw new Error('Function not implemented.');
}