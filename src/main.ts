import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
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
const t = 9;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initializeSwagger(app);

  app.enableCors();
  app.useGlobalInterceptors(new TransformDataStructure());
  await app.listen(4000);
  console.log('HTTP server is listening on port 4000');
}
bootstrap();
