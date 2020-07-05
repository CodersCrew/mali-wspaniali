import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

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
}
