import { ChildAssessmentResultCore } from '../../models/child_assessment_result_model';

export class ChildAssessmentResultUpdatedEvent {
  constructor(public result: ChildAssessmentResultCore) {}
}
