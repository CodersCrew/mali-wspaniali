import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleDTO } from './article_dto';

@ObjectType()
export class PaginatedArticlesDTO {
  @Field(() => [ArticleDTO])
  readonly articles: Record<string, any>[];

  @Field(() => Int)
  readonly count: number;

  @Field()
  readonly hasNext: boolean;
}
