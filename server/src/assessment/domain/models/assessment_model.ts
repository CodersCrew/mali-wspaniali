import { AggregateRoot } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../events/impl/assessment_created_event';
import { CoreModel } from '../../../shared/utils/core_model';
import { Expose, Transform, Type } from 'class-transformer';
import { Length, ValidateNested } from 'class-validator';

export class AssessmentCore extends CoreModel {
  @Expose()
  @Length(5, 140)
  title: string;

  @Expose()
  isOutdated: boolean;

  @Expose()
  @Transform(value => (typeof value === 'string' ? new Date(value) : value))
  firstMeasurementStartDate: Date;

  @Expose()
  @Transform(value => (typeof value === 'string' ? new Date(value) : value))
  firstMeasurementEndDate: Date;

  @Expose()
  @Transform(value => (typeof value === 'string' ? new Date(value) : value))
  lastMeasurementStartDate: Date;

  @Expose()
  @Transform(value => (typeof value === 'string' ? new Date(value) : value))
  lastMeasurementEndDate: Date;

  @Expose()
  firstMeasurementStatus: string;

  @Expose()
  lastMeasurementStatus: string;

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => KindergartenInstructorModel)
  kindergartens: KindergartenInstructorModel[];
}

class KindergartenInstructorModel {
  @Expose()
  kindergartenId: string;

  @Expose()
  instructorId: string | null;
}

export class Assessment extends AggregateRoot {
  private constructor(private props: AssessmentCore) {
    super();

    this.guardAgainstStartDateSmallerThanEndDate(props);
  }

  get id(): string {
    return this.props._id;
  }

  get title(): string {
    return this.props.title;
  }

  get isOutdated(): boolean {
    return this.props.isOutdated;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted || false;
  }

  get firstMeasurementStartDate(): Date {
    return this.props.firstMeasurementStartDate;
  }

  get firstMeasurementEndDate(): Date {
    return this.props.firstMeasurementEndDate;
  }

  get lastMeasurementStartDate(): Date {
    return this.props.lastMeasurementStartDate;
  }

  get lastMeasurementEndDate(): Date {
    return this.props.lastMeasurementEndDate;
  }

  get firstMeasurementStatus(): string {
    return this.props.firstMeasurementStatus;
  }

  get lastMeasurementStatus(): string {
    return this.props.lastMeasurementStatus;
  }

  get kindergartens(): {
    kindergartenId: string;
    instructorId: string | null;
  }[] {
    return this.props.kindergartens;
  }

  getProps(): AssessmentCore {
    return this.props;
  }

  update(update: Partial<AssessmentCore>) {
    if (update._id) {
      throw new Error('An id cannot be change');
    }

    this.props = { ...this.props, ...update };

    this.guardAgainstStartDateSmallerThanEndDate(this.props);
  }

  static create(initialData: AssessmentCore): Assessment {
    const assessment = new Assessment(initialData);

    assessment.apply(new AssessmentCreatedEvent(assessment));

    return assessment;
  }

  static recreate(initialData: AssessmentCore) {
    return new Assessment(initialData);
  }

  private guardAgainstStartDateSmallerThanEndDate(value: AssessmentCore) {
    const isFirstMeasurementValid = firstDateSmallerThanOther(
      value.firstMeasurementStartDate,
      value.firstMeasurementEndDate,
    );

    const isLastMeasurementValid = firstDateSmallerThanOther(
      value.lastMeasurementStartDate,
      value.lastMeasurementEndDate,
    );

    if (!isFirstMeasurementValid || !isLastMeasurementValid) {
      throw new Error('The start date cannot be greater than the end date');
    }
  }
}

function firstDateSmallerThanOther(date1: Date, date2: Date) {
  return date1.getTime() < date2.getTime();
}
