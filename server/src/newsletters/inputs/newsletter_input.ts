import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewsletterInput {
  @Field()
  message: string;

  @Field(() => [String])
  recipients: string[];

  @Field()
  title: string;

  @Field()
  type: string;
}
