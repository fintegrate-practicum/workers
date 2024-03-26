import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AdminModule } from './admin/admin.module';
import { WorkersModule } from './worker/workers.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
    .setTitle('Cats example') 
    .setDescription('The cats API description')  
    .setVersion('1.0')  
    .addTag('cats')   
    .build(); 
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); 


   const adminConfig = new DocumentBuilder()
   .setTitle('Admin API') 
   .setDescription('API for Admin operations') 
   .setVersion('1.0') 
   .addTag('admin') 
   .build(); 
 const adminDocument = SwaggerModule.createDocument(app, adminConfig); 
 SwaggerModule.setup('admin/api', app, adminDocument);
  
 
    const workerConfig = new DocumentBuilder()
    .setTitle('worker API') 
    .setDescription('API for Worker operations') 
    .setVersion('1.0')
    .addTag('worker')
    .build(); 
  const workerDocument = SwaggerModule.createDocument(app, workerConfig);
    SwaggerModule.setup('worker/api', app, workerDocument); 
   




    await app.listen(3030);
    console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();






