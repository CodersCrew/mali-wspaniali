import { InputType, Field } from '@nestjs/graphql';

import { RedactorInput } from './redactor_input';

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  category: string;

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

@InputType()
export class UpdateArticleInput extends CreateArticleInput {
  @Field(() => Boolean)
  isDeleted: boolean;

  @Field(() => Boolean)
  isPublished: boolean;
}
