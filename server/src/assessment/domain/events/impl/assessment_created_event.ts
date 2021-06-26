import { Assessment } from '../../models/assessment_model';

export class AssessmentCreatedEvent {
  constructor(public assessment: Assessment) {}
}
