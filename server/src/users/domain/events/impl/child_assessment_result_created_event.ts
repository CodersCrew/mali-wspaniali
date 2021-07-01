import { ChildAssessmentResultCore } from '../../models/child_assessment_result_model';

export class ChildAssessmentResultCreatedEvent {
  constructor(public result: ChildAssessmentResultCore) {}
}
