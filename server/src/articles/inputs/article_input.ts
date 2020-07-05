import { InputType, Field, Int } from '@nestjs/graphql';

import { RedactorInput } from './redactor_input';

@InputType()
export class ArticleInput {
  @Field(() => [String])
  readonly category: string[];

  @Field()
  readonly contentHTML: string;

  @Field()
  readonly description: string;

  @Field()
  readonly header: string;

  @Field()
  readonly pictureUrl: string;

  @Field(() => Int)
  readonly readingTime: number;

  @Field()
  readonly redactor: RedactorInput;

  @Field()
  readonly subtitle: string;

  @Field(() => [String])
  readonly tags: string[];

  @Field()
  readonly title: string;

  @Field({ nullable: true })
  readonly videoUrl?: string;
}
