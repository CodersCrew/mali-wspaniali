import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class FieldCore {
  @Field(() => ID)
  _id: string;

  @Field()
  isDeleted: boolean;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  modifiedAt: Date;

  @Field({ nullable: true })
  deletedAt: Date;
}
