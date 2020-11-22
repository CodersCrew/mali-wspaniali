import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectId } from '../../../users/domain/models/object_id_value_object';
import { KindergartenTitle } from './kindergarten_title_value_object';
import { Document } from 'mongoose';
import { IsDeleted } from './is_deleted_value_object';

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

export interface KindergartenP {
  readonly _id: ObjectId;
  readonly date: Date;
  readonly number: number;
  readonly name: KindergartenTitle;
  readonly address: string;
  readonly city: string;
  isDeleted: IsDeleted;
}

export class Kindergarten extends AggregateRoot {
  private constructor(private readonly props: KindergartenP) {
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

  static create(value: KindergartenP) {
    return new Kindergarten(value);
  }

  static recreate(value: KindergartenP) {
    return new Kindergarten(value);
  }
}
