import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
      useFactory: async (config) => ({
        uri: config.get('DATABASE_URI'), // Use DATABASE_URI from environment variable
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
