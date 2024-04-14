import { NestFactory } from '@nestjs/core';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import { AppModule } from './app.module';
// import {AppModel}
import { AppModule } from './app.module';

import { TransformDataStructure } from './transformDataStructure/convertData';


async function initializeSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Main api base')
    .setDescription('The main API description')
    .setVersion('1.0')
    .addTag('main')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule);



  await initializeSwagger(app);

  app.useGlobalInterceptors(new TransformDataStructure());
  await app.listen(3000);
}
bootstrap();
