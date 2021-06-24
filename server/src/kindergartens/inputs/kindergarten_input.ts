import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class KindergartenInput {
  @Field(() => Int)
  number: number;

  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  city: string;
}

@InputType()
export class UpdatedKindergartenInput extends PartialType(KindergartenInput) {}
