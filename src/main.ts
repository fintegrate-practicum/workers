import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformDataStructure } from './transformDataStructure/convertData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformDataStructure());

  await app.listen(3000);
}
bootstrap();
