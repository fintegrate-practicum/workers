import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  Query,
  Body,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { Employee } from '../../schemas/employee.entity';
import { TransformDataStructure } from '../../transformDataStructure/convertData';
import { Request, Response, response } from 'express';
import { User } from 'src/schemas/user.entity';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) { }

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
    try {
      const Response = this.workersService.updateUser(
        id, data,
      );
      if (!response) {
        throw new HttpException("user not found",
          HttpStatus.BAD_REQUEST);
      } return response;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    this.workersService.updateUser(id, data);
  }
}



