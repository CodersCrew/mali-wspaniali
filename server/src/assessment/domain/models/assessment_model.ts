import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { CreateAssessmentInput } from '../../inputs/create_assessment_input';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';

export interface AssessmentDto {
  title: string;
  startDate: string;
  endDate: string;
  kindergartenIds: ObjectId[];
}

export class Assessment extends AggregateRoot {
  data: AssessmentDto;

  private constructor(initialData: AssessmentDto) {
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

  static create(initialData: AssessmentDto): Assessment {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(initialData));

    return assessment;
  }

  static recreate(initialData: AssessmentDto) {
    return new Assessment(initialData);
  }
}
