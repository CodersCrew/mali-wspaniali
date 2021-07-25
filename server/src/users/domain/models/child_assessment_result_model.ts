import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';
import { CoreModel } from '../../../shared/utils/core_model';
import {
  ChildAssessmentResultCreatedEvent,
  ChildAssessmentResultUpdatedEvent,
} from '../events/impl';
import { PartialUpdateChildResultInput } from '../../inputs/child_result_input';
import { ChildAssessmentResultMapper } from '../mappers/child_assessment_result_mapper';

export class ChildAssessmentResultCore extends CoreModel {
  @Expose()
  childId: string;

  @Expose()
  kindergartenId: string;

  @Expose()
  assessmentId: string;

  @Expose()
  firstMeasurementNote: string;

  @Expose()
  lastMeasurementNote: string;

  @Expose()
  firstMeasurementRunDate: Date;

  @Expose()
  lastMeasurementRunDate: Date;

  @Expose()
  firstMeasurementPendelumRunDate: Date;

  @Expose()
  lastMeasurementPendelumRunDate: Date;

  @Expose()
  firstMeasurementThrowDate: Date;

  @Expose()
  lastMeasurementThrowDate: Date;

  @Expose()
  firstMeasurementJumpDate: Date;

  @Expose()
  lastMeasurementJumpDate: Date;

  @Expose()
  firstMeasurementRunResult: number;

  @Expose()
  lastMeasurementRunResult: number;

  @Expose()
  firstMeasurementPendelumRunResult: number;

  @Expose()
  lastMeasurementPendelumRunResult: number;

  @Expose()
  firstMeasurementThrowResult: number;

  @Expose()
  lastMeasurementThrowResult: number;

  @Expose()
  firstMeasurementJumpResult: number;

  @Expose()
  lastMeasurementJumpResult: number;

  @Expose()
  firstMeasurementKindergarten: string;

  @Expose()
  lastMeasurementKindergarten: string;

  @Expose()
  @Transform(value => value ?? '')
  firstMeasurementGroup: string;

  @Expose()
  @Transform(value => value ?? '')
  lastMeasurementGroup: string;
}

export class ChildAssessmentResult extends AggregateRoot {
  private constructor(private props: ChildAssessmentResultCore) {
    super();
  }

  get _id(): string {
    return this.props._id;
  }

  get childId(): string {
    return this.props.childId;
  }

  getProps(): ChildAssessmentResultCore {
    return this.props;
  }

  update(value: PartialUpdateChildResultInput) {
    const updated = ChildAssessmentResultMapper.toDomain({
      ...this.getProps(),
      ...value,
    });

    updated.props.modifiedAt = new Date();

    this.props = updated.getProps();

    this.apply(new ChildAssessmentResultUpdatedEvent(this.getProps()));
  }

  static create(props: ChildAssessmentResultCore): ChildAssessmentResult {
    const user = new ChildAssessmentResult(props);

    user.apply(new ChildAssessmentResultCreatedEvent(user.getProps()));

    return user;
  }

  static recreate(props: ChildAssessmentResultCore): ChildAssessmentResult {
    const user = new ChildAssessmentResult(props);

    return user;
  }
}
