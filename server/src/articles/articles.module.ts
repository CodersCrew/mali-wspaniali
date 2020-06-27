import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesResolver } from './articles.resolver';
import { ArticleSchema } from './schemas/articles.schema';
import { ArticleService } from './articles.service';
import { ArticlesRepository } from './domain/repositories/article_repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  providers: [ArticlesResolver, ArticleService, ArticlesRepository],
})
export class ArticlesModule {}
