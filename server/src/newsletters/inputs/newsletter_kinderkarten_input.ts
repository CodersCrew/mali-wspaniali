import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewsletterKindergartenInput {
  @Field()
  readonly message: string;

  @Field(() => [String])
  readonly kindergartens: string[];

  @Field()
  readonly title: string;

  @Field()
  readonly type: string;
}
