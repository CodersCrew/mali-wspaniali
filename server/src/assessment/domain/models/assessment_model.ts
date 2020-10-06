import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';

export interface AssessmentDto {
  title: string;
}

export interface CreationAssessmentDto {
  title: string;
}

export class Assessment extends AggregateRoot {
  data: AssessmentDto;

  private constructor(initialData: AssessmentDto) {
    super();

    this.data = initialData;
  }

  static create(initialData: CreationAssessmentDto) {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(initialData));

    return assessment;
  }

  static recreate(initialData: AssessmentDto) {
    return new Assessment(initialData);
  }
}
