import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { AppModule } from './app.module';
import { isProduction } from './shared/utils/is_production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  Sentry.init({
    dsn: process.env.SENTRY_API_KEY,
    enabled: isProduction(),
  });

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
