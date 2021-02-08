import { InputType, PartialType, OmitType, ObjectType } from '@nestjs/graphql';
import { ChildAssessmentResultDTO } from '../dto/child_assessment_result';

@InputType()
export class PartialChildResultInput extends PartialType(
  OmitType(ChildAssessmentResultDTO, ['_id']),
  InputType,
) {}

@InputType()
export class PartialUpdateChildResultInput extends PartialType(
  ChildAssessmentResultDTO,
  InputType,
) {}

@ObjectType()
export class PartialChildResult extends PartialType(
  ChildAssessmentResultDTO,
  ObjectType,
) {}
