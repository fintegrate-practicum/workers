import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
// import { AdminModule } from './admin/module/admin.module';
import { WorkersModule } from './worker/module/workers.module';
import { MessagesModule } from './message/module/messages.module';
import { Employee } from './schemas/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WorkersModule,
    MessagesModule,
    // AdminModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_CONNECTION,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService,RabbitPublisherService, TransformDataStructure],
})
export class AppModule {}
