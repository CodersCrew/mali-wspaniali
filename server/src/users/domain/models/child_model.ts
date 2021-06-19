import { AggregateRoot } from '@nestjs/cqrs';
import { ChildCreatedEvent, ChildUpdatedEvent } from '../events/impl';
import { CoreModel } from '../../../shared/utils/core_model';
import { Expose, Transform } from 'class-transformer';
import { IsIn, Length, Max, Min } from 'class-validator';
import { KindergartenCore } from '../../../kindergartens/domain/models/kindergarten_model';
import { ChildAssessmentResultCore } from './child_assessment_result_model';

export interface ChildWithKindergartenProps
  extends Omit<ChildCore, 'kindergarten' | 'results'> {
  kindergarten: KindergartenCore;
  results: ChildAssessmentResultCore[];
}

export class ChildCore extends CoreModel {
  @Expose()
  @Length(3, 40)
  firstname: string;

  @Expose()
  @Length(3, 50)
  lastname: string;

  @Expose()
  @IsIn(['male', 'female'])
  sex: string;

  @Expose()
  birthYear: number;

  @Expose()
  @Min(0)
  @Max(3)
  birthQuarter: number;

  @Expose()
  kindergarten: string;

  @Expose()
  @Transform(value => value ?? [])
  results: string[];
}

export class Child extends AggregateRoot {
  private constructor(private readonly props: ChildCore) {
    super();
  }

  get id() {
    return this.props._id;
  }

  get firstname(): string {
    return this.props.firstname;
  }

  get lastname(): string {
    return this.props.lastname;
  }

  get sex(): string {
    return this.props.sex;
  }

  get birthYear(): number {
    return this.props.birthYear;
  }

  get birthQuarter(): number {
    return this.props.birthQuarter;
  }

  get kindergarten(): string {
    return this.props.kindergarten;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get results(): string[] {
    return this.props.results;
  }

  getProps(): ChildCore {
    return this.props;
  }

  delete() {
    this.props.isDeleted = true;

    this.props.firstname = 'anonymized';
    this.props.lastname = 'anonymized';

    this.apply(
      new ChildUpdatedEvent(this.id, {
        firstname: this.props.firstname,
        lastname: this.props.firstname,
        isDeleted: true,
        deletedAt: new Date(),
      }),
    );
  }

  static recreate(props: ChildCore): Child {
    return new Child(props);
  }

  static create(props: ChildCore): Child {
    const child = new Child(props);

    child.apply(new ChildCreatedEvent(child.id));

    return child;
  }
}
