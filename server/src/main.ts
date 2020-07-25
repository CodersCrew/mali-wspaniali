import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';

import { AppModule } from './app.module';
import { isProduction } from './shared/utils/is_production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: isProduction()
        ? 'https://mali-wspaniali.netlify.app'
        : 'http://localhost:3000',
      methods: 'GET,POST',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      credentials: true,
    },
  });

  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Origin',
      isProduction()
        ? 'https://mali-wspaniali.netlify.app'
        : 'http://localhost:3000',
    );

    return next();
  });

  Sentry.init({
    dsn: process.env.SENTRY_API_KEY,
    enabled: isProduction(),
  });

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
