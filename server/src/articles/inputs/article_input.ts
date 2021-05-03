import { InputType, Field, Int } from '@nestjs/graphql';

import { RedactorInput } from './redactor_input';
import { CategoryProps } from '../domain/models/category';
import { ArticleProps } from '../../articles/domain/models/article_model';

@InputType()
export class ArticleInput {
  @Field(() => String)
  category: CategoryProps;

  @Field()
  contentHTML: string;

  @Field()
  description: string;

  @Field()
  pictureUrl: string;

  @Field()
  redactor: RedactorInput;

  @Field(() => [String])
  tags: string[];

  @Field()
  title: string;

  @Field({ nullable: true })
  videoUrl?: string;
}
