import { Module } from '@nestjs/common';
import { WorkersService } from '../services/workers.service';
import { WorkersController } from '../controllers/workers.controller';

@Module({
  providers: [WorkersService],
  controllers: [WorkersController]
})
export class WorkersModule {}
