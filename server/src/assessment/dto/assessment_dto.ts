import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class AssessmentDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  isOutdated: boolean;

  @Field()
  title: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;
}
