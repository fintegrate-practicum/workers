// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TransformDataStructure } from './transformDataStructure/convertData';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AdminModule } from './admin/module/admin.module';
// import { WorkersModule } from './worker/module/workers.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     WorkersModule,
//     AdminModule,
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: async (config: ConfigService) => ({
//         uri: config.get(process.env.MONGODB_CONNECTION_COMPASS),
//         //uri: config.get(process.env.MONGODB_CONNECTION_ATLAS),
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AppController],
//   providers: [AppService, TransformDataStructure],
// })
// export class AppModule { }
import { AuthzModule } from './authz/authz.module';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { WorkersModule } from './worker/module/workers.module';
import { env } from 'node:process';



import { TransformDataStructure } from './transformDataStructure/convertData';


@Module({
  imports: [
    ConfigModule.forRoot(),
    WorkersModule,
    AdminModule,
    MongooseModule.forRootAsync({
      
      imports: [ConfigModule,WorkersModule, AuthzModule],
      useFactory: async (config: ConfigService) => ({
        // uri: config.get(process.env.MONGODB_CONNECTION_COMPASS),
        uri: process.env.MONGODB_CONNECTION_COMPASS
        

        
        //uri: config.get(process.env.MONGODB_CONNECTION_ATLAS),
      }),
      inject: [ConfigService]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


