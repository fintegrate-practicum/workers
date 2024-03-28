import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformDataStructure } from '../transformDataStructure/convertData';
import { ValidateDataStructure } from 'transformDataStructure/convertDataValidation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Apply middleware globally
    app.use(TransformDataStructure);
    app.use(ValidateDataStructure);
    
  await app.listen(3000);
}
bootstrap();






