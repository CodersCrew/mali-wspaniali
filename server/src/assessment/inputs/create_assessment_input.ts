import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAssessmentInput {
  @Field()
  readonly title: string;

  @Field()
  readonly startDate: string;

  @Field()
  readonly endDate: string;

  @Field(() => [String])
  readonly kindergartenIds: string[];
}
