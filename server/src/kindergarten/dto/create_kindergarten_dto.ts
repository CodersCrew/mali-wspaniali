import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateKindergartenDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly city: string;

  @Field()
  readonly number: string;

  @Field()
  readonly name: string;
}
