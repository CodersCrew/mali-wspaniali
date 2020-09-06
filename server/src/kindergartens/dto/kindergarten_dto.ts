import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class KindergartenDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field(() => Int)
  readonly number: number;

  @Field()
  readonly name: string;
}
