import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import helmet from 'helmet';
import { json } from 'express';

async function bootstrap() {
  // HTTPS cert & key path check
  const certPath = './cert/localhost.crt';
  const keyPath = './cert/localhost.key';

  let httpsOptions = null;
  if (fs.existsSync(certPath) && fs.existsSync(keyPath)) {
    httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    };
  } else {
    console.warn(
      '[Warning] HTTPS certificate or key file not found. Starting server without HTTPS.'
    );
  }

  // Create Nest app with or without HTTPS depending on cert availability
  const app = await NestFactory.create(AppModule, {
    ...(httpsOptions ? { httpsOptions } : {}),
  });

  // Helmet for HTTP headers security
  app.use(helmet());

  // JSON body parser middleware
  app.use(json());

  // Enable CORS (consider restricting origins in production)
  app.enableCors({
    origin: ['https://yourdomain.com'], // replace with your allowed domains in prod
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Listen port - HTTPS default 443, fallback 3000
  const port = process.env.PORT || (httpsOptions ? 443 : 3000);
  await app.listen(port);

  console.log(
    `Server running on ${httpsOptions ? 'https' : 'http'}://localhost:${port}`
  );
}
bootstrap();
