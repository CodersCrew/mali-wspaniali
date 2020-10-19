import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { CreateAssessmentInput } from '../../inputs/create_assessment_input';

export interface AssessmentDto {
  title: string;
  startDate: string;
  endDate: string;
  kindergartenIds: string[];
}

export class Assessment extends AggregateRoot {
  data: AssessmentDto;

  private constructor(initialData: AssessmentDto) {
    super();

    this.data = initialData;
  }

  static create(initialData: CreateAssessmentInput) {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(initialData));

    return assessment;
  }

  static recreate(initialData: AssessmentDto) {
    return new Assessment(initialData);
  }
}
