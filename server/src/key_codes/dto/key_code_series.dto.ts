import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class KeyCodeSeriesDTO {
  @Field()
  readonly date: Date;

  @Field()
  readonly createdBy: string;

  @Field()
  readonly keyCode: string;

  @Field()
  readonly series: string;

  @Field()
  readonly target: string;

  @Field(() => Int)
  count: number;
}
