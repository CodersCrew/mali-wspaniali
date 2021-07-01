import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NewsletterDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  message: string;

  @Field(() => [String])
  recipients: string[];

  @Field()
  date: Date;

  @Field()
  title: string;

  @Field()
  type: string;

  @Field()
  isDone: boolean;
}
