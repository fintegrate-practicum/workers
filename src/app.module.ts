import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { Controller, Get } from '@nestjs/common';

// @Controller()
// export class MockController {
//   @Get('/')
//   mockEndpoint() {
//     return { status: 200, data: { message: 'Mock response' } };
//   }
// }


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TransformDataStructure],
})
export class AppModule {
  
}
