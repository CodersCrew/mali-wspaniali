import { AssessmentInput } from '../../../inputs/assessment_input';

export class CreateAssessmentCommand {
  constructor(public readonly assessment: AssessmentInput) {}
}
