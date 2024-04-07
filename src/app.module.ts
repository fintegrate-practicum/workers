import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    })
  ],
  controllers: [AppController],
  providers: [AppService, RabbitPublisherService, ],
})
export class AppModule { }
