import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class ChildAssessmentResultDTO extends FieldCore {
  @Field(() => ID)
  childId: string;

  @Field(() => ID)
  kindergartenId: string;

  @Field(() => ID)
  assessmentId: string;

  @Field(() => Date, { nullable: true })
  firstMeasurementRunDate: Date;

  @Field(() => Date, { nullable: true })
  lastMeasurementRunDate: Date;

  @Field(() => Date, { nullable: true })
  firstMeasurementPendelumRunDate: Date;

  @Field(() => Date, { nullable: true })
  lastMeasurementPendelumRunDate: Date;

  @Field(() => Date, { nullable: true })
  firstMeasurementThrowDate: Date;

  @Field(() => Date, { nullable: true })
  lastMeasurementThrowDate: Date;

  @Field(() => Date, { nullable: true })
  firstMeasurementJumpDate: Date;

  @Field(() => Date, { nullable: true })
  lastMeasurementJumpDate: Date;

  @Field({ nullable: true })
  firstMeasurementNote: string;

  @Field({ nullable: true })
  lastMeasurementNote: string;

  @Field(() => ID, { nullable: true })
  firstMeasurementKindergarten: string;

  @Field(() => ID, { nullable: true })
  lastMeasurementKindergarten: string;

  @Field(() => ID, { nullable: true })
  firstMeasurementInstructor: string;

  @Field(() => ID, { nullable: true })
  lastMeasurementInstructor: string;

  @Field(() => Float, { nullable: true })
  firstMeasurementRunResult: number;

  @Field(() => Float, { nullable: true })
  lastMeasurementRunResult: number;

  @Field(() => Float, { nullable: true })
  firstMeasurementPendelumRunResult: number;

  @Field(() => Float, { nullable: true })
  lastMeasurementPendelumRunResult: number;

  @Field(() => Float, { nullable: true })
  firstMeasurementThrowResult: number;

  @Field(() => Float, { nullable: true })
  lastMeasurementThrowResult: number;

  @Field(() => Float, { nullable: true })
  firstMeasurementJumpResult: number;

  @Field(() => Float, { nullable: true })
  lastMeasurementJumpResult: number;
}
