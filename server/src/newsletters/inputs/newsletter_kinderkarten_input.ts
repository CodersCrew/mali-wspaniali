import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewsletterKindergartenInput {
  @Field()
  message: string;

  @Field(() => [String])
  kindergartens: string[];

  @Field()
  title: string;

  @Field()
  type: string;
}
