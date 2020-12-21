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
