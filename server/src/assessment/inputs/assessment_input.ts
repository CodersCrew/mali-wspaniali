import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class AssessmentInput {
  @Field()
  readonly title: string;

  @Field()
  readonly startDate: string;

  @Field()
  readonly endDate: string;

  @Field()
  readonly firstMeasurementStartDate: string;

  @Field()
  readonly firstMeasurementEndDate: string;

  @Field()
  readonly lastMeasurementStartDate: string;

  @Field()
  readonly lastMeasurementEndDate: string;

  @Field(() => [String])
  readonly kindergartenIds: string[];
}

@InputType()
class _UpdatedAssessmmentInput extends AssessmentInput {
  @Field(() => [GraphQLJSONObject])
  kindergartens: Array<{ kindergartenId: string; instructorId: string }>;

  @Field()
  readonly isOutdated: boolean;

  @Field()
  readonly isDeleted: boolean;

  @Field()
  readonly status: string;

  @Field()
  readonly firstMeasurementStatus: string;

  @Field()
  readonly lastMeasurementStatus: string;
}

@InputType()
export class UpdatedAssessmentInput extends PartialType(
  OmitType(_UpdatedAssessmmentInput, ['kindergartenIds']),
) {}
