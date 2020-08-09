import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as session from 'cookie-session';

import { AppModule } from './app.module';
import { isProduction } from './shared/utils/is_production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      name: 'qid',
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        secure: isProduction(),
        maxAge: 100000,
        sameSite: 'none',
      },
    }),
  );

  Sentry.init({
    dsn: process.env.SENTRY_API_KEY,
    enabled: isProduction(),
  });

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
