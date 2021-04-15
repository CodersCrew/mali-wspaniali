import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class ChildAssessmentResultDTO {
  @Field(() => ID)
  _id: string;

  @Field(() => ID)
  childId: string;

  @Field(() => ID)
  kindergartenId: string;

  @Field(() => ID)
  assessmentId: string;

  @Field(() => Date, { nullable: true })
  readonly firstMeasurementRunDate: Date;

  @Field(() => Date, { nullable: true })
  readonly lastMeasurementRunDate: Date;

  @Field(() => Date, { nullable: true })
  readonly firstMeasurementPendelumRunDate: Date;

  @Field(() => Date, { nullable: true })
  readonly lastMeasurementPendelumRunDate: Date;

  @Field(() => Date, { nullable: true })
  readonly firstMeasurementThrowDate: Date;

  @Field(() => Date, { nullable: true })
  readonly lastMeasurementThrowDate: Date;

  @Field(() => Date, { nullable: true })
  readonly firstMeasurementJumpDate: Date;

  @Field(() => Date, { nullable: true })
  readonly lastMeasurementJumpDate: Date;

  @Field({ nullable: true })
  readonly firstMeasurementNote: string;

  @Field({ nullable: true })
  readonly lastMeasurementNote: string;

  @Field(() => ID, { nullable: true })
  readonly firstMeasurementKindergarten: string;

  @Field(() => ID, { nullable: true })
  readonly lastMeasurementKindergarten: string;

  @Field(() => ID, { nullable: true })
  readonly firstMeasurementInstructor: string;

  @Field(() => ID, { nullable: true })
  readonly lastMeasurementInstructor: string;

  @Field(() => Float, { nullable: true })
  readonly firstMeasurementRunResult: number;

  @Field(() => Float, { nullable: true })
  readonly lastMeasurementRunResult: number;

  @Field(() => Float, { nullable: true })
  readonly firstMeasurementPendelumRunResult: number;

  @Field(() => Float, { nullable: true })
  readonly lastMeasurementPendelumRunResult: number;

  @Field(() => Float, { nullable: true })
  readonly firstMeasurementThrowResult: number;

  @Field(() => Float, { nullable: true })
  readonly lastMeasurementThrowResult: number;

  @Field(() => Float, { nullable: true })
  readonly firstMeasurementJumpResult: number;

  @Field(() => Float, { nullable: true })
  readonly lastMeasurementJumpResult: number;
}
