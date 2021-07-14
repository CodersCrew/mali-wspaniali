import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
class ParamsDTO {
  @Field(() => String)
  sex: string;

  @Field(() => Int)
  age: number;

  @Field(() => Float)
  a: number;

  @Field(() => Float)
  b: number;

  @Field(() => Float)
  lowerLimit: number;

  @Field(() => Float)
  lowerLimitPoints: number;

  @Field(() => Float)
  upperLimit: number;

  @Field(() => Float)
  upperLimitPoints: number;

  @Field(() => Float)
  badStageLimit: number;

  @Field(() => Float)
  weakStageLimit: number;

  @Field(() => Float)
  middleStageLimit: number;

  @Field(() => Float)
  goodStageLimit: number;

  @Field(() => Float)
  veryGoodStageLimit: number;

  @Field(() => Float)
  minScale: number;

  @Field(() => Float)
  scale39: number;

  @Field(() => Float)
  scale49: number;

  @Field(() => Float)
  scale59: number;

  @Field(() => Float)
  maxScale: number;
}

@ObjectType()
export class ChildCurrentParamsDTO {
  @Field(() => ParamsDTO, { nullable: true })
  run: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  pendelumRun: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  throw: ParamsDTO;

  @Field(() => ParamsDTO, { nullable: true })
  jump: ParamsDTO;
}
