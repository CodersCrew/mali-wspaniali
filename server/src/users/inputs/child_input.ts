import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class ChildInput {
  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field(() => Int)
  readonly birthYear: number;

  @Field(() => Int)
  readonly birthQuarter: number;

  @Field()
  readonly sex: string;

  @Field()
  readonly kindergartenId: string;
}

@InputType()
export class UpdatedChildInput extends PartialType(ChildInput) {
  @Field()
  readonly childId: string;
}
