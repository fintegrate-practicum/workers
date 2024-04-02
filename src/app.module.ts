import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Import ConfigService
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { WorkersModule } from './worker/workers.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    WorkersModule,
    AdminModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // Inject ConfigModule to use ConfigService
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DATABASE_URI'),
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
