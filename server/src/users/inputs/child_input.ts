import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ChildInput {
  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field(() => Int)
  readonly birthYear: number;

  @Field()
  readonly sex: string;
}
