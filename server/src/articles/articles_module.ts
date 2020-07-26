import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesResolver } from './articles_resolver';
import { ArticleSchema } from './schemas/articles_schema';
import { ArticlesRepository } from './domain/repositories/article_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers/index';
import { QueryHandlers } from './domain/queries/handlers';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users_module';
import { GqlAuthGuard } from '../users/guards/jwt_guard';

@Module({
  imports: [
    CqrsModule,
    NotificationsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  providers: [
    ArticlesResolver,
    ArticlesRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    GqlAuthGuard,
  ],
})
export class ArticlesModule {}
