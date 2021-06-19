import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';
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

  @Field(() => GraphQLISODateTime)
  readonly firstMeasurementStartDate: Date;

  @Field(() => GraphQLISODateTime)
  readonly firstMeasurementEndDate: Date;

  @Field(() => GraphQLISODateTime)
  readonly lastMeasurementStartDate: Date;

  @Field(() => GraphQLISODateTime)
  readonly lastMeasurementEndDate: Date;

  @Field()
  readonly status: string;

  @Field()
  readonly firstMeasurementStatus: string;

  @Field()
  readonly lastMeasurementStatus: string;

  @Field(() => [KindergartenWithInstructorDTO])
  kindergartens: any;
}
