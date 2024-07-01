declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const file = fs.readFileSync(path.resolve('timesheet-swagger.yaml'), 'utf8');

  const swaggerDocument = YAML.parse(file);

  app.useGlobalPipes(new ValidationPipe());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
