import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreModelDto {
  @Field(() => ID)
  _id: string;

  @Field()
  isDeleted: boolean;

  @Field()
  createdAt: Date;

  @Field()
  deletedAt: Date;

  @Field()
  modifiedAt: Date;
}
