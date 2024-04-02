import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function initializeSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Main api example')
    .setDescription('The main API description')
    .setVersion('1.0')
    .addTag('main')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await initializeSwagger(app);

  await app.listen(3030);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
