import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class AgreementDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly date: Date;

  @Field()
  readonly text: string;
}
