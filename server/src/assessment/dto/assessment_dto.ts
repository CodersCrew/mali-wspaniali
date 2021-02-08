import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { KindergartenWithInstructorDTO } from './kindergarten_with_instructor_dto';

@ObjectType()
export class AssessmentDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  isOutdated: boolean;

  @Field()
  isDeleted: boolean;

  @Field()
  title: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field()
  readonly firstMeasurementStartDate: string;

  @Field()
  readonly firstMeasurementEndDate: string;

  @Field()
  readonly lastMeasurementStartDate: string;

  @Field()
  readonly lastMeasurementEndDate: string;

  @Field()
  readonly status: string;

  @Field()
  readonly firstMeasurementStatus: string;

  @Field()
  readonly lastMeasurementStatus: string;

  @Field(() => [KindergartenWithInstructorDTO])
  kindergartens: any;
}
