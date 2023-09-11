import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Utility import scanner')
    .setDescription('The imports scanning utility API description')
    .setVersion('1.0')
    .addTag('imports-scanning-utility')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs', app, document);
  await app.listen(3000);
}
bootstrap();
