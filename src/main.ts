import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import { join } from 'path';

import { AppModule } from './app.module';

dotenv.config({ path: join(__dirname, '..', '.env') });

const port = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const docContent = await readFile(
    join(__dirname, '..', 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = parse(docContent);

  SwaggerModule.setup('doc', app, document);

  await app.listen(port);
}
bootstrap();
