import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { WorkersModule } from './worker/workers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkersModule,
    AdminModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get(process.env.MONGODB_CONNECTION_COMPASS),
        //uri: config.get(process.env.MONGODB_CONNECTION_ATLAS),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TransformDataStructure],
})
export class AppModule { }


