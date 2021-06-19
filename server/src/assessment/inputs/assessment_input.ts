import { InputType, Field, PartialType, OmitType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class AssessmentInput {
  @Field()
  readonly title: string;

  @Field()
  readonly firstMeasurementStartDate: Date;

  @Field()
  readonly firstMeasurementEndDate: Date;

  @Field()
  readonly lastMeasurementStartDate: Date;

  @Field()
  readonly lastMeasurementEndDate: Date;

  @Field()
  readonly status: string;

  @Field()
  readonly firstMeasurementStatus: string;

  @Field()
  readonly lastMeasurementStatus: string;

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
}

@InputType()
export class UpdatedAssessmentInput extends PartialType(
  OmitType(_UpdatedAssessmmentInput, ['kindergartenIds']),
) {}
