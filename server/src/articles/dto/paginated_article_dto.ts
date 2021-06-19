import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleDTO } from './article_dto';

@ObjectType()
export class PaginatedArticlesDTO {
  @Field(() => [ArticleDTO])
  articles: Record<string, any>[];

  @Field(() => Int)
  count: number;

  @Field()
  hasNext: boolean;
}
