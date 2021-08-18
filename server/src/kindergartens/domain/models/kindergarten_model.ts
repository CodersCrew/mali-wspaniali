import { AggregateRoot } from '@nestjs/cqrs';
import { Expose } from 'class-transformer';
import { Min, MinLength } from 'class-validator';

import { KindergartenCreatedEvent } from '../events/impl';
import { KindergartenUpdatedEvent } from '../events/impl/kindergarten_updated_event';
import { CoreModel } from '../../../shared/utils/core_model';

export class KindergartenCore extends CoreModel {
  @Expose()
  @MinLength(3)
  name: string;

  @Expose()
  address: string;

  @Expose()
  @Min(0)
  number: number;

  @Expose()
  city: string;
}

export class Kindergarten extends AggregateRoot {
  private constructor(private props: KindergartenCore) {
    super();
  }

  get id(): string {
    return this.props._id;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get number(): number {
    return this.props.number;
  }

  get name(): string {
    return this.props.name;
  }

  get address(): string {
    return this.props.address;
  }

  get city(): string {
    return this.props.city;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  getProps(): KindergartenCore {
    return this.props;
  }

  delete() {
    this.props.isDeleted = true;

    this.apply(
      new KindergartenUpdatedEvent(this.id, {
        isDeleted: true,
      }),
    );
  }

  static create(value: KindergartenCore) {
    const kindergarten = new Kindergarten(value);

    kindergarten.apply(new KindergartenCreatedEvent(kindergarten.id));

    return kindergarten;
  }

  static recreate(value: KindergartenCore) {
    return new Kindergarten(value);
  }
}
