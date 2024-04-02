import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkersModule } from './worker/workers.module';

@Module({
  imports: [WorkersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
