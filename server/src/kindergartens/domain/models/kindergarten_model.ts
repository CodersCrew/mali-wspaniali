import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { KindergartenTitle } from './kindergarten_title_value_object';
import { Document } from 'mongoose';
import { IsDeleted } from './is_deleted_value_object';
import { KindergartenCreatedEvent } from '../events/impl';
import { KindergartenUpdatedEvent } from '../events/impl/kindergarten_updated_event';

export interface KindergartenProps {
  _id: string;
  date: Date;
  number: number;
  name: string;
  address: string;
  city: string;
  isDeleted: boolean;
}

export type KindergartenDocument = Document & KindergartenProps;

export interface Props {
  readonly _id: ObjectId;
  readonly date: Date;
  readonly number: number;
  readonly name: KindergartenTitle;
  readonly address: string;
  readonly city: string;
  isDeleted: IsDeleted;
}

export class Kindergarten extends AggregateRoot {
  private constructor(private readonly props: Props) {
    super();
  }

  get id(): ObjectId {
    return this.props._id;
  }

  get date(): Date {
    return this.props.date;
  }

  get number(): number {
    return this.props.number;
  }

  get name(): KindergartenTitle {
    return this.props.name;
  }

  get address(): string {
    return this.props.address;
  }

  get city(): string {
    return this.props.city;
  }

  get isDeleted(): IsDeleted {
    return this.props.isDeleted;
  }

  delete() {
    this.props.isDeleted = IsDeleted.create(true).getValue();

    this.apply(
      new KindergartenUpdatedEvent(this.id.toString(), {
        isDeleted: true,
      }),
    );
  }

  static create(value: Props) {
    const kindergarten = new Kindergarten(value);

    kindergarten.apply(
      new KindergartenCreatedEvent(kindergarten.id.toString()),
    );

    return kindergarten;
  }

  static recreate(value: Props) {
    return new Kindergarten(value);
  }
}
