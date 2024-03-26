import { Controller, Get, Param } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { Worker } from './workers.entity';

@Controller('workers')
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @Get()
  async findAll(): Promise<Worker[]> {
    return this.workersService.findAll();
  }
  
  @Get(':id')
  getWorker(@Param('id') id: string) {
    return this.workersService.getWorker(id);
  }
}
