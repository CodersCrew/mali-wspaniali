import { CreateAssessmentInput } from '../../../inputs/create_assessment_input';

export class CreateAssessmentCommand {
  constructor(public readonly assessment: CreateAssessmentInput) {}
}
