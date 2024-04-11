// import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { TransformDataStructure } from '../transformDataStructure/convertData';
// import { Request, Response } from 'express';
// import { Controller } from '@nestjs/common';
//   import { WorkersService  } from '../worker/services/workers.service'
//   import { AuthGuard } from '@nestjs/passport';
// import { Employee } from 'src/schemas/employee.entity';
// import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
// import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
// import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
// import { Body, Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';


// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
// @Controller('workers')
// @ApiTags('workers')
// @Controller('workers')
// export class WorkersController {
//     constructor(private readonly workersService: WorkersService) {}
//     @Get()
//     @ApiBearerAuth()
//     @ApiTags('workers')
//     @UseInterceptors(TransformDataStructure)
//     async getData(req: Request, res: Response): Promise<void> {
//         res.json({ message: 'Original data' });
//     }
//     @Get()
//     async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
//       return this.workersService.findAllByBusinessId(businessId);
//     }
//     @Get(':id')
//     getWorker(@Param('id') id: string) {
//       return this.workersService.getEmployee(id);
//     }
//     @UseGuards(AuthGuard('jwt'))
//     @Post()
//     async create(@Body('worker') worker: Employee): Promise<void> {
//       this.workersService.createEmployee(worker);
//     }
// }


import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Request, Response } from 'express';
import { Controller } from '@nestjs/common';
import { WorkersService } from '../worker/services/workers.service';
import { AuthGuard } from '@nestjs/passport';
import { Employee } from 'src/schemas/employee.entity';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { Body, Param, Query } from '@nestjs/common/decorators/http/route-params.decorator';

@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
@ApiTags('workers')
@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all workers' })
  @ApiResponse({ status: 200, description: 'Return all workers.' })
  @UseInterceptors(TransformDataStructure)
  async getData(req: Request, res: Response): Promise<void> {
    res.json({ message: 'Original data' });
  }

  @Get()
  @ApiOperation({ summary: 'Get all workers by business ID' })
  @ApiResponse({ status: 200, description: 'Return all workers by business ID.' })
  async findAll(@Query('businessId') businessId: string): Promise<Employee[]> {
    return this.workersService.findAllByBusinessId(businessId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a worker by ID' })
  @ApiResponse({ status: 200, description: 'Return the worker.' })
  getWorker(@Param('id') id: string) {
    return this.workersService.getEmployee(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new worker' })
  @ApiResponse({ status: 201, description: 'The worker has been successfully created.' })
  async create(@Body() worker: Employee): Promise<void> {
    this.workersService.createEmployee(worker);
  }
}
