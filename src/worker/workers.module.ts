import { Module } from '@nestjs/common';
import { WorkersService } from './workers.service';
import { WorkersController } from './workers.controller';

@Module({
  providers: [WorkersService], // Add WorkerModel to providers
  controllers: [WorkersController],
})
export class WorkersModule {}
