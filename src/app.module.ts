import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformDataStructure } from '../transformDataStructure/convertData';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TransformDataStructure],
})
export class AppModule {}
