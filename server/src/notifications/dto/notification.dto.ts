import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NotificationDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly user: string;

  @Field()
  readonly templateId: string;

  @Field(() => [String])
  readonly values: string[];
}
