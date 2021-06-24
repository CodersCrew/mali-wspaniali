import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { KindergartenDTO } from '../../kindergartens/dto/kindergarten_dto';
import { ChildAssessmentResultDTO } from './child_assessment_result';
import { FieldCore } from '../../shared/utils/field_core';

@ObjectType()
export class ChildDTO extends FieldCore {
  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field(() => Int)
  birthYear: number;

  @Field(() => Int)
  birthQuarter: number;

  @Field()
  sex: string;

  @Field(() => [ChildAssessmentResultDTO])
  results: string[];

  @Field(() => KindergartenDTO)
  kindergarten: string;
}
