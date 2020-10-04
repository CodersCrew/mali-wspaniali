import { AssessmentDto } from '../../models/assessment_model';

export class AssessmentCreatedEvent {
  constructor(public readonly assessment: AssessmentDto) {}
}
