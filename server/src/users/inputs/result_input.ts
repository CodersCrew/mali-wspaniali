import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ResultInput {
  @Field()
  type: string;

  @Field(() => Int)
  childAge: number;

  @Field(() => Int)
  agilityPoints: number;

  @Field(() => Int)
  agilitySeconds: number;

  @Field(() => Int)
  powerCentimeters: number;

  @Field(() => Int)
  powerPoints: number;

  @Field(() => Int)
  schoolYearStart: number;

  @Field(() => Int)
  speedPoints: number;

  @Field(() => Int)
  speedSeconds: number;

  @Field(() => Int)
  strengthCentimeters: number;

  @Field(() => Int)
  strengthPoints: number;

  @Field()
  testPeriod: string;
}
