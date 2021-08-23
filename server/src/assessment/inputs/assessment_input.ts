import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class GroupInput {
  @Field()
  kindergartenId: string;

  @Field()
  group: string;
}

@InputType()
export class AssessmentInput {
  @Field()
  title: string;

  @Field()
  firstMeasurementStartDate: Date;

  @Field()
  firstMeasurementEndDate: Date;

  @Field()
  lastMeasurementStartDate: Date;

  @Field()
  lastMeasurementEndDate: Date;

  @Field()
  firstMeasurementStatus: string;

  @Field()
  lastMeasurementStatus: string;

  @Field(() => [String])
  kindergartenIds: string[];
}

@InputType()
class _UpdatedAssessmmentInput extends AssessmentInput {
  @Field(() => [GraphQLJSONObject])
  kindergartens: Array<{ kindergartenId: string; instructorId: string }>;

  @Field()
  isOutdated: boolean;

  @Field()
  isDeleted: boolean;

  @Field(() => [GroupInput])
  groups: Array<{ kindergartenId: string; group: string }>;
}

@InputType()
export class UpdatedAssessmentInput extends PartialType(
  OmitType(_UpdatedAssessmmentInput, ['kindergartenIds']),
) {}
