import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformDataStructure } from '../transformDataStructure/convertData';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Apply middleware globally
    app.use(TransformDataStructure);
    
  await app.listen(3000);
}
bootstrap();






