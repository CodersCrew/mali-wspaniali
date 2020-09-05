import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class EditKindergartenInput {
  @Field(() => Int, { nullable: true })
  readonly number: number;

  @Field({ nullable: true })
  readonly name: string;

  @Field({ nullable: true })
  readonly address: string;

  @Field({ nullable: true })
  readonly city: string;
}
