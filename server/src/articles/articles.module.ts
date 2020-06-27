import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ArticlesResolver } from './articles.resolver';
import { ArticleSchema } from './schemas/articles.schema';

@Module({
  providers: [ArticlesResolver],
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
})
export class ArticlesModule {}
