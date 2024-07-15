declare const module: any;

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const swaggerUi = require('swagger-ui-express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const file = fs.readFileSync(path.resolve('timesheet-swagger.yaml'), 'utf8');

  const swaggerDocument = YAML.parse(file);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // solve "Excluding unknown property" error https://github.com/typestack/class-transformer/issues/700
    }),
  );

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // middleware
  app.use(helmet());
  app.enableCors({
    origin: configService.get<string>('SWAGGER_URL') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // app.use(csurf()); //deprecated
  const PORT = configService.get<string>('PORT') || 3000;
  await app.listen(PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
