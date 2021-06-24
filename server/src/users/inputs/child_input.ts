import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class ChildInput {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  birthYear: number;

  @Field(() => Int)
  birthQuarter: number;

  @Field()
  sex: string;

  @Field()
  kindergartenId: string;
}

@InputType()
export class UpdatedChildInput extends PartialType(ChildInput) {
  @Field()
  childId: string;
}
