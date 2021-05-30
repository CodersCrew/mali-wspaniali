import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CreateKeyCodeDTO {
  @Field(() => ID)
  id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly createdBy: string;

  @Field()
  readonly keyCode: string;

  @Field()
  readonly series: string;

  @Field()
  readonly target: string;
}
