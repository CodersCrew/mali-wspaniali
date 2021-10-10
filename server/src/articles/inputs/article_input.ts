import { InputType, Field, PartialType } from '@nestjs/graphql';

import { RedactorInput } from './redactor_input';

@InputType()
export class CreateArticleInput {
  @Field()
  title: string;

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

  @Field({ nullable: true })
  videoUrl?: string;
}

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => String)
  _id: string;

  @Field(() => Boolean, { nullable: true })
  isDeleted: boolean;

  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;

  @Field(() => Number, { nullable: true })
  views: number;
}
