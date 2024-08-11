import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RabbitPublisherService } from './rabbit-publisher/rabbit-publisher.service';
import { WorkersModule } from './worker/module/workers.module';
import { AuthzModule } from './authz/authz.module';
import { TasksModule } from './tasks/module/tasks.module';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MessagesModule } from './message/module/messages.module';
import { UserModule } from './user/module/users.module';
import { GoogleCalendarModule } from './tasks/google_calendar/module/google-calendar.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    TasksModule,
    WorkersModule,
    MessagesModule,
    TasksModule,
    GoogleCalendarModule,
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