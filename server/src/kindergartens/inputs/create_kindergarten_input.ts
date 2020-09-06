import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateKindergartenInput {
  @Field(() => Int)
  readonly number: number;

  @Field()
  readonly name: string;
}
