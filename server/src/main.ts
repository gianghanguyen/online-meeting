import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { GlobalExceptionsFilter } from './common/exception/global-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //Handle global exception
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors();

  // Helmet can help protect your app from some well-known web vulnerabilities
  // by setting HTTP headers appropriately
  app.use((helmet as any)());

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // auto validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger OPENAPI
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('API docs')
    .setDescription('The API document is generated automatically')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
