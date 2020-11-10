import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { CreateAssessmentInput } from '../../inputs/create_assessment_input';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';

export interface AssessmentDto {
  title: string;
  startDate: string;
  endDate: string;
  kindergartenIds: string[];
}

interface AssessmentProps {
  title: string;
  startDate: string;
  endDate: string;
  kindergartenIds: ObjectId[];
}

export class Assessment extends AggregateRoot {
  data: AssessmentProps;

  private constructor(initialData: AssessmentProps) {
    super();

    this.data = initialData;
  }

  get title(): string {
    return this.data.title;
  }

  get startDate(): string {
    return this.data.startDate;
  }

  get endDate(): string {
    return this.data.endDate;
  }

  get kindergartenIds(): ObjectId[] {
    return this.data.kindergartenIds;
  }

  static create(initialData: AssessmentProps): Assessment {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(assessment));

    return assessment;
  }

  static recreate(initialData: AssessmentProps) {
    return new Assessment(initialData);
  }
}
