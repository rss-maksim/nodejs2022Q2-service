import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';

import { AppModule } from './app.module';
import env from './env';
import { LoggingService } from './modules/logging/logging.service';

const port = Number(env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useLogger(app.get(LoggingService));
  app.useGlobalPipes(new ValidationPipe());

  const loggingService = new LoggingService();

  process
    .on('unhandledRejection', (reason, p) => {
      console.error(reason, 'Unhandled Rejection at Promise', p);
      loggingService.error(`'Unhandled Rejection at Promise' ${reason}`);
    })
    .on('uncaughtException', (error) => {
      console.error(error, 'Uncaught Exception thrown');
      loggingService.error(`'Uncaught Exception thrown' ${error}`);
      process.exit(1);
    });

  const docContent = await readFile(
    join(__dirname, '..', 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(docContent);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
