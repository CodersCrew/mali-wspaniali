import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsletterResolver } from './newsletters_resolver';
import { NewsletterSchema } from './schemas/newsletter_schema';
import { NewslettersRepository } from './domain/repositories/newsletters_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers';
import { QueryHandlers } from './domain/queries/handlars';
import { NotificationsModule } from '../notifications/notifications.module';
import { UserModule } from '../users/users.module';
import { GqlAuthGuard } from '../users/guards/jwt_guard';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'Newsletter', schema: NewsletterSchema },
    ]),
  ],
  providers: [
    NewsletterResolver,
    NewslettersRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    GqlAuthGuard,
  ],
})
export class NewslettersModule {}
