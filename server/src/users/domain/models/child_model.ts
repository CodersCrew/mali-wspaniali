import * as mongoose from 'mongoose';

import { ChildResultProps } from './child_result_model';
import { AggregateRoot } from '@nestjs/cqrs';
import { Firstname } from './firstname_value_object';
import { Lastname } from './lastname_value_object';
import { Sex } from './sex_value_object';
import { BirthYear } from './birth_year_value_object';
import { ObjectId } from './object_id_value_object';
import { Result } from '../../../shared/domain/result';
import { ChildCreatedEvent, ChildUpdatedEvent } from '../events/impl';
import { KindergartenProps } from '../../../kindergartens/domain/models/kindergarten_model';
import { BirthQuarter } from './birth_quarter_value_object';

export interface ChildProps {
  _id: string;
  firstname: string;
  lastname: string;
  sex: string;
  birthYear: number;
  birthQuarter: number;
  isDeleted: boolean;
  date: Date;
  results: string[];
  kindergarten: string;
}

export type NotCreatedChildProps = Omit<ChildProps, '_id' | 'date'>;

export interface ChildWithKindergartenProps
  extends Omit<ChildProps, 'kindergarten' | 'results'> {
  kindergarten: KindergartenProps;
  results: ChildResultProps[];
}

interface Props {
  _id: ObjectId;
  firstname: Firstname;
  lastname: Lastname;
  sex: Sex;
  birthYear: BirthYear;
  birthQuarter: BirthQuarter;
  date: Date;
  kindergarten: ObjectId;
  isDeleted: boolean;
  results: ObjectId[];
}

export class Child extends AggregateRoot {
  private constructor(private readonly props: Props) {
    super();
  }

  get id() {
    return this.props._id;
  }

  get firstname(): Firstname {
    return this.props.firstname;
  }

  get lastname(): Lastname {
    return this.props.lastname;
  }

  get sex(): Sex {
    return this.props.sex;
  }

  get birthYear(): BirthYear {
    return this.props.birthYear;
  }

  get birthQuarter(): BirthQuarter {
    return this.props.birthQuarter;
  }

  get kindergarten(): ObjectId {
    return this.props.kindergarten;
  }

  get isDeleted() {
    return this.props.isDeleted;
  }

  get date(): Date {
    return this.props.date;
  }

  get results(): ObjectId[] {
    return this.props.results;
  }

  delete() {
    this.props.isDeleted = true;

    this.props.firstname = Firstname.create('anonymized').getValue();
    this.props.lastname = Lastname.create('anonymized').getValue();

    this.apply(
      new ChildUpdatedEvent(this.id.toString(), {
        firstname: 'anonymized',
        lastname: 'anonymized',
        isDeleted: true,
      }),
    );
  }

  static recreate(props: Props): Child {
    return new Child(props);
  }

  static create(props: Props): Child {
    const child = new Child(props);

    child.apply(new ChildCreatedEvent(child.id.toString()));

    return child;
  }
}

export class ChildWithKindergarten {
  private constructor(
    private readonly child: Child,
    private readonly kindergarten: any,
  ) {}

  static recreateWithKindergarten(
    child: Child,
    kindergarten: any,
  ): Result<ChildWithKindergarten> {
    if (!child.kindergarten.equals(kindergarten)) {
      return Result.fail(
        "Kindergarten id must be equal with child's kindergarten id",
      );
    }

    return Result.ok(new ChildWithKindergarten(child, kindergarten));
  }
}
