import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { KindergartenWithInstructorDTO } from './kindergarten_with_instructor_dto';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class GroupDTO {
  @Field()
  kindergartenId: string;

  @Field()
  group: string;
}

@ObjectType()
export class AssessmentDTO extends FieldCore {
  @Field()
  isOutdated: boolean;

  @Field()
  title: string;

  @Field(() => GraphQLISODateTime)
  firstMeasurementStartDate: Date;

  @Field(() => GraphQLISODateTime)
  firstMeasurementEndDate: Date;

  @Field(() => GraphQLISODateTime)
  lastMeasurementStartDate: Date;

  @Field(() => GraphQLISODateTime)
  lastMeasurementEndDate: Date;

  @Field()
  firstMeasurementStatus: string;

  @Field()
  lastMeasurementStatus: string;

  @Field(() => [KindergartenWithInstructorDTO])
  kindergartens: Array<{ kindergartenId: string; instructorId: string }>;

  @Field(() => [GroupDTO])
  groups: Array<{ kindergartenId: string; group: string }>;
}
