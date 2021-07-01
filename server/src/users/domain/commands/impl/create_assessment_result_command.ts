import { PartialChildResultInput } from '../../../inputs/child_result_input';

export class CreateAssessmentResultCommand {
  constructor(public result: PartialChildResultInput) {}
}
