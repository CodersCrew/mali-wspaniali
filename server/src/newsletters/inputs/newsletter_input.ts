import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewsletterInput {
  @Field()
  readonly message: string;

  @Field(() => [String])
  readonly recipients: string[];

  @Field()
  readonly title: string;

  @Field()
  readonly type: string;
}
