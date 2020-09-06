import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ArticleDTO } from './article_dto';
import { ArticleProps } from '../domain/models/article_model';

@ObjectType()
export class PaginatedArticlesDTO {
  @Field(() => [ArticleDTO])
  readonly articles: ArticleProps[];

  @Field(() => Int)
  readonly count: number;

  @Field()
  readonly hasNext: boolean;
}
