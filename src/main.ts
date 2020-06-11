import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    //TODO enable below line after origin is setup
    // app.enableCors({ origin: serverConfig.origin });
    app.enableCors();
    // logger.log(`Accepting requests from origin ${serverConfig.origin}`);
    logger.log('Accepting requests .. PROD ###');
  }

  const port = process.env.PORT || serverConfig.port;

  await app.listen(port);

  logger.log(`Application listening on ${port}`);
}
bootstrap();
