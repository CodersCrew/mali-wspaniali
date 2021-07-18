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
import { UsersModule } from '../users/users_module';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { SendMail } from '../shared/services/send_mail/send_mail';
import { FreshmailProvider } from '../shared/services/send_mail/freshmail_service';
import { SandboxProvider } from '../shared/services/send_mail/nodemailer_provider';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    UsersModule,
    MongooseModule.forFeature([
      { name: 'Newsletter', schema: NewsletterSchema },
    ]),
  ],
  providers: [
    NewsletterResolver,
    NewslettersRepository,
    SendMail,
    FreshmailProvider,
    SandboxProvider,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    GqlAuthGuard,
  ],
})
export class NewslettersModule {}
