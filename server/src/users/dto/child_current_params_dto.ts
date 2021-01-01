import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
class ParamsDTO {
  @Field(() => String)
  readonly sex: string;

  @Field(() => Int)
  readonly age: number;

  @Field(() => Float)
  readonly a: number;

  @Field(() => Float)
  readonly b: number;

  @Field(() => Float)
  readonly lowerLimit: number;

  @Field(() => Float)
  readonly lowerLimitPoints: number;

  @Field(() => Float)
  readonly upperLimit: number;

  @Field(() => Float)
  readonly upperLimitPoints: number;
}

@ObjectType()
export class ChildCurrentParamsDTO {
  @Field(() => ParamsDTO, { nullable: true })
  readonly run: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  readonly pendelumRun: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  readonly throw: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  readonly jump: ParamsDTO;
}
