import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class KindergartenInput {
  @Field()
  readonly city: string;

  @Field()
  readonly number: string;

  @Field()
  readonly name: string;
}
