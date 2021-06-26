import { AssessmentInput } from '../../../inputs/assessment_input';

export class CreateAssessmentCommand {
  constructor(public assessment: AssessmentInput) {}
}
