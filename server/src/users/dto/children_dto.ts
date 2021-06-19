import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';
import { ChildAssessmentResultDTO } from './child_assessment_result';

@ObjectType()
export class ChildDTO {
  @Field(() => ID)
  _id: string;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly firstname: string;

  @Field()
  readonly lastname: string;

  @Field(() => Int)
  readonly birthYear: number;

  @Field(() => Int)
  readonly birthQuarter: number;

  @Field()
  readonly sex: string;

  @Field(() => [ChildAssessmentResultDTO])
  readonly results: string[];

  @Field(() => KindergartenDTO)
  readonly kindergarten: string;

  @Field()
  readonly isDeleted: boolean;
}
