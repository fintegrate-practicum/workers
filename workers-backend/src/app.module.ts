import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { WorkersModule } from './worker/module/workers.module';
import { TasksModule } from './tasks/module/tasks.module';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MessagesModule } from './message/module/messages.module';
import { UsersModule } from './user/module/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    WorkersModule,
    MessagesModule,
    UsersModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_CONNECTION,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RabbitPublisherService, TransformDataStructure],
})
export class AppModule {}
