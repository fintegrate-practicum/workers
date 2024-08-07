import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Post,
  ValidationPipe,
  BadRequestException,
  UseGuards,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { workerValidationsSchema } from '../validations/worker.validations.schema';
import { Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Workers')
@Controller('workers')
export class WorkersController {
  private readonly logger = new Logger(WorkersController.name);

  constructor(private readonly workersService: WorkersService) { }
  @ApiBearerAuth()
  @ApiTags('workers')
  @UseInterceptors(TransformDataStructure)
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
    return this.workersService.findAll(businessId);
  }

  @Get('employee/:id')
  @ApiOperation({ summary: 'Activate an employee' })
  @Post(':id/activate')
  async activateEmployee(@Param('id') id: string): Promise<Employee> {
    const employee = await this.workersService.activateEmployee(id);
    if (!employee) {
      throw new NotFoundException('employee not found');
    }
    return employee;
  }

  @Get(':id')
  getWorker(@Param('id') id: string) {
    const employee = this.workersService.getEmployeeByUserId(id);
    if (!employee)
      throw new NotFoundException('employee not found');
    return employee;
  }

  @Get('data')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(TransformDataStructure)
  async getData(@Body() req: Request, @Body() res: Response): Promise<void> {
    res.json({ message: 'Original data' });
  }

  @Get('company/:companyId')
  @UseGuards(AuthGuard('jwt'))
  async get(@Param('companyId') id: string): Promise<Employee[]> {
    const result = await this.workersService.findAllByBusinessId(id);
    return result;
  }

  @ApiOperation({ summary: 'Add a new employee' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        businessId: { type: 'string' },
        code: { type: 'string' },
        createdBy: { type: 'string' },
        updatedBy: { type: 'string' },
        nameEmployee: { type: 'string' },
        role: {
          type: 'object',
          properties: {
            type: { type: 'string' },
            active: { type: 'boolean' },
            description: { type: 'string' },
          },
        },
      },
    },
  })
  
  @Post('')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          Logger.log('error validation! ' + errors);
          return new BadRequestException(errors);
        },
      }),
    )
    @Body() requestBody: workerValidationsSchema,) {
    this.logger.log(requestBody);
    const result = this.workersService.createEmployee(requestBody);
    this.logger.log('good');
    return result;
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() user: Employee) {
    const response = this.workersService.updateEmployeeByUserId(id, user);
    if (!response) {
      throw new NotFoundException('employee not found');
    }
    return response;
  }
}
