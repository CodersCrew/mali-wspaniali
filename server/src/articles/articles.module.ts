import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesResolver } from './articles.resolver';
import { ArticleSchema } from './schemas/articles.schema';
import { ArticlesRepository } from './domain/repositories/article_repository';
import { CommandHandlers } from './domain/commands/handlers';
import { EventHandlers } from './domain/events/handlers/index';
import { QueryHandlers } from './domain/queries/handlers';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  providers: [
    ArticlesResolver,
    ArticlesRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ArticlesModule {}
