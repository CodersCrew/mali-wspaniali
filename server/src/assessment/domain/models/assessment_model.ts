import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { SimpleDate } from './simple_date_value_object';
import { Title } from './title_value_object';

export interface AssessmentInput {
  title: string;
  startDate: string;
  endDate: string;
  kindergartenIds: string[];
}

export interface AssessmentDto {
  _id?: string;
  title: string;
  startDate: string;
  endDate: string;
  kindergartens: Array<{
    kindergartenId: string;
    instructorId: string | null;
  }>;
}

interface AssessmentProps {
  _id: ObjectId;
  title: Title;
  startDate: SimpleDate;
  endDate: SimpleDate;
  kindergartens: Array<{
    kindergartenId: ObjectId;
    instructorId: ObjectId | null;
  }>;
}

export class Assessment extends AggregateRoot {
  data: AssessmentProps;

  private constructor(initialData: AssessmentProps) {
    super();

    this.data = initialData;
  }

  get id() {
    return this.data._id;
  }

  get title(): Title {
    return this.data.title;
  }

  get startDate(): SimpleDate {
    return this.data.startDate;
  }

  get endDate(): SimpleDate {
    return this.data.endDate;
  }

  get kindergartens(): AssessmentProps['kindergartens'] {
    return this.data.kindergartens;
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
