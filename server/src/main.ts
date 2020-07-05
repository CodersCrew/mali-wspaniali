import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  Sentry.init({
    dsn: process.env.SENTRY_API_KEY,
  });

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
