import { ObjectType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ChildResultDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => Date)
  readonly date: Date;

  @Field(() => GraphQLJSONObject)
  readonly test: object;
}
