import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { WorkersModule } from './worker/workers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables from .env file
    WorkersModule,
    AdminModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Inject ConfigModule to use ConfigService
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb+srv://userDBWorkers:1234@workers.iccnfuh.mongodb.net/?retryWrites=true&w=majority&appName=Workers'), // Get MongoDB URI from environment variable
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
