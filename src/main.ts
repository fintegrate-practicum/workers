import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformDataStructure } from './transformDataStructure/convertData';
import { PapertrailLogger } from 'logger/logger.service';

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
  const app = await NestFactory.create(AppModule);
  const papertrailLogger = app.get(PapertrailLogger);
  app.useLogger(papertrailLogger);  

  await initializeSwagger(app);

  app.enableCors();
  app.useGlobalInterceptors(new TransformDataStructure());
  await app.listen(4000);
  console.log('Server is running on http://localhost:4000');
}
bootstrap();