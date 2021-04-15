import { UpdatedAssessmentInput } from '../../../inputs/assessment_input';

export class UpdateAssessmentCommand {
  constructor(
    public id: string,
    public readonly assessment: UpdatedAssessmentInput,
  ) {}
}
