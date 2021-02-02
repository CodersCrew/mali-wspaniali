import { PartialUpdateChildResultInput } from '../../../inputs/child_result_input';

export class UpdateAssessmentResultCommand {
  constructor(public readonly result: PartialUpdateChildResultInput) {}
}
