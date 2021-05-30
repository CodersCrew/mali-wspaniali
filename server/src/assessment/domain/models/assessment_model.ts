import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { SimpleDate } from './simple_date_value_object';
import { Title } from './title_value_object';
import { KindergartenWithInstructor } from './kindergarten_with_instructor_value_object';

export interface AssessmentDto {
  _id?: string;
  title: string;
  isOutdated: boolean;
  isDeleted: boolean;
  startDate: string;
  endDate: string;
  firstMeasurementStartDate: string;
  firstMeasurementEndDate: string;
  lastMeasurementStartDate: string;
  lastMeasurementEndDate: string;
  status: string;
  firstMeasurementStatus: string;
  lastMeasurementStatus: string;
  kindergartens: Array<{
    kindergartenId: string;
    instructorId: string | null;
  }>;
}

export interface AssessmentProps {
  _id: ObjectId;
  title: Title;
  isOutdated: boolean;
  isDeleted: boolean;
  startDate: SimpleDate;
  endDate: SimpleDate;
  firstMeasurementStartDate: SimpleDate;
  firstMeasurementEndDate: SimpleDate;
  lastMeasurementStartDate: SimpleDate;
  lastMeasurementEndDate: SimpleDate;
  status: string;
  firstMeasurementStatus: string;
  lastMeasurementStatus: string;
  kindergartens: KindergartenWithInstructor[];
}

export class Assessment extends AggregateRoot {
  data: AssessmentProps;

  private constructor(initialData: AssessmentProps) {
    super();

    this.guardAgainstStartDateSmallerThanEndDate(initialData);

    this.data = initialData;
  }

  get id(): ObjectId {
    return this.data._id;
  }

  get title(): Title {
    return this.data.title;
  }

  get isOutdated(): boolean {
    return this.data.isOutdated;
  }

  get isDeleted(): boolean {
    return this.data.isDeleted || false;
  }

  get startDate(): SimpleDate {
    return this.data.startDate;
  }

  get endDate(): SimpleDate {
    return this.data.endDate;
  }

  get firstMeasurementStartDate(): SimpleDate {
    return this.data.firstMeasurementStartDate;
  }

  get firstMeasurementEndDate(): SimpleDate {
    return this.data.firstMeasurementEndDate;
  }

  get lastMeasurementStartDate(): SimpleDate {
    return this.data.lastMeasurementStartDate;
  }

  get lastMeasurementEndDate(): SimpleDate {
    return this.data.lastMeasurementEndDate;
  }

  get status(): string {
    return this.data.status;
  }

  get firstMeasurementStatus(): string {
    return this.data.firstMeasurementStatus;
  }

  get lastMeasurementStatus(): string {
    return this.data.lastMeasurementStatus;
  }

  get kindergartens(): AssessmentProps['kindergartens'] {
    return this.data.kindergartens;
  }

  update(update: Partial<AssessmentProps>) {
    if (update._id) {
      throw new Error('An id cannot be change');
    }

    this.data = { ...this.data, ...update };

    this.guardAgainstStartDateSmallerThanEndDate(this.data);
  }

  static create(initialData: AssessmentProps): Assessment {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(assessment));

    return assessment;
  }

  static recreate(initialData: AssessmentProps) {
    return new Assessment(initialData);
  }

  private guardAgainstStartDateSmallerThanEndDate(value: AssessmentProps) {
    if (value.startDate.isGreaterThan(value.endDate)) {
      throw new Error('The start date cannot be greater than the end date');
    }
  }
}
