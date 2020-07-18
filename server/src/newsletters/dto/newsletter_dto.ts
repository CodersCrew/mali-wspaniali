import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class NewsletterDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  readonly message: string;

  @Field(() => [String])
  readonly recipients: string[];

  @Field()
  readonly date: Date;

  @Field()
  readonly title: string;

  @Field()
  readonly type: string;

  @Field()
  readonly isDone: boolean;
}
