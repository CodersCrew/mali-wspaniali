import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class KindergartenInput {
  @Field(() => Int)
  readonly number: number;

  @Field()
  readonly name: string;

  @Field()
  readonly address: string;

  @Field()
  readonly city: string;
}

@InputType()
export class UpdatedKindergartenInput extends PartialType(KindergartenInput) {}
