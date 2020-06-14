import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    // app.enableCors({ origin: serverConfig.origin });
    app.enableCors();
    // logger.log(`Accepting requests from origin ${serverConfig.origin}`);
  }

  //Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Create, Update, Get, Delete task APIs')
    .setVersion('1.0')
    // .addTag('task-mgmt')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`Application listening on ${port}`);
}
bootstrap();
