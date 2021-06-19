import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NotificationDTO {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: true })
  readonly createdAt: Date;

  @Field()
  readonly user: string;

  @Field()
  readonly templateId: string;

  @Field(() => [String])
  readonly values: string[];

  @Field()
  readonly isRead: boolean;
}
