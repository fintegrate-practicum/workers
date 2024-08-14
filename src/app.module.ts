import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { WorkersModule } from './worker/module/workers.module';
import { UserModule } from './user/module/users.module';
import { GoogleCalendarModule } from './tasks/google_calendar/module/google-calendar.module';
import { Employee } from './schemas/employee.entity';
import { env } from 'process';
import { AuthzModule } from 'fintegrate-auth';
import { TasksModule } from './tasks/module/tasks.module';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MessagesModule } from './message/module/messages.module';
import { AdminModule } from './admin/module/admin.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TasksModule,
    WorkersModule,
    MessagesModule,
    TasksModule,
    GoogleCalendarModule,
    AdminModule,
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