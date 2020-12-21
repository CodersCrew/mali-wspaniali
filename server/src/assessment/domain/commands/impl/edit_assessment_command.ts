import { UpdatedAssessmentInput } from '../../../inputs/assessment_input';

export class EditAssessmentCommand {
  constructor(
    public id: string,
    public readonly assessment: UpdatedAssessmentInput,
  ) {}
}
