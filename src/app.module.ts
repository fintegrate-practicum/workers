import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    //Connection to Mongo DB Atlas
    //MongooseModule.forRoot(process.env.MONGODB_CONNECTION_ATLAS)
    //Connection to Mongo DB compass - for development
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_COMPASS)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppMomongodule { }
