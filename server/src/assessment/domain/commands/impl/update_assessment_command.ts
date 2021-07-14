import { UpdatedAssessmentInput } from '../../../inputs/assessment_input';

export class UpdateAssessmentCommand {
  constructor(public id: string, public assessment: UpdatedAssessmentInput) {}
}
