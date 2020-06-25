import { Module } from '@nestjs/common';
import { ArticlesResolver } from './articles.resolver';

@Module({
  providers: [ArticlesResolver],
})
export class ArticlesModule {}
