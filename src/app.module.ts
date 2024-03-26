import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://userDBWorkers:1234@workers.iccnfuh.mongodb.net/?retryWrites=true&w=majority&appName=Workers'),
    MongooseModule.forRoot('mongodb://localhost:27017/project')]
  ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppMomongodule { }
