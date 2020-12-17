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

  @Field(() => [KindergartenWithInstructorDTO])
  kindergartens: any;
}
