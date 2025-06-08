import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as https from 'https';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./cert/localhost.key'),
    cert: fs.readFileSync('./cert/localhost.crt'),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.enableCors();
  await app.listen(443); // Run on port 443 for Viber compatibility
}
bootstrap();
