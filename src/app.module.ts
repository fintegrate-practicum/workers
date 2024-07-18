import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { WorkersModule } from './worker/module/workers.module';
import { Employee } from './schemas/employee.entity';
import { env } from 'process';
import { AuthzModule } from './authz/authz.module';
import { TasksModule } from './tasks/module/tasks.module';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MessagesModule } from './message/module/messages.module';
import { UserModule } from './user/module/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UserModule,
    TasksModule,
    WorkersModule,
    MessagesModule,
    TasksModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule, WorkersModule, AuthzModule],
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGODB_URI,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers:[AppController],
  providers: [AppService, RabbitPublisherService, TransformDataStructure],
})
export class AppModule {}
