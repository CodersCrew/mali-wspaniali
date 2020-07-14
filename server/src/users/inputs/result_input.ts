import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ResultInput {
  @Field()
  readonly type: string;

  @Field(() => Int)
  readonly childAge: number;

  @Field(() => Int)
  readonly agilityPoints: number;

  @Field(() => Int)
  readonly agilitySeconds: number;

  @Field(() => Int)
  readonly powerCentimeters: number;

  @Field(() => Int)
  readonly powerPoints: number;

  @Field(() => Int)
  readonly schoolYearStart: number;

  @Field(() => Int)
  readonly speedPoints: number;

  @Field(() => Int)
  readonly speedSeconds: number;

  @Field(() => Int)
  readonly strengthCentimeters: number;

  @Field(() => Int)
  readonly strengthPoints: number;

  @Field()
  readonly testPeriod: string;
}
