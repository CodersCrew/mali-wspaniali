import * as mongoose from 'mongoose';

import { ChildResultProps } from './child_result_model';
import { AggregateRoot } from '@nestjs/cqrs';
import { Firstname } from './firstname_value_object';
import { Lastname } from './lastname_value_object';
import { Sex } from './sex_value_object';
import { BirthYear } from './birth_year_value_object';
import { ObjectId } from './object_id_value_object';
import { Result } from '../../../shared/domain/result';
import { ChildDeletedEvent } from '../events/impl/child_deleted_event';
import { ChildCreatedEvent } from '../events/impl';
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
  results?: mongoose.Schema.Types.ObjectId[] | ChildResultProps[];
  kindergarten: string;
}

export interface ChildWithKindergartenProps
  extends Omit<ChildProps, 'kindergarten'> {
  kindergarten: KindergartenProps;
}

interface Props {
  _id: ObjectId;
  firstname: Firstname;
  lastname: Lastname;
  sex: Sex;
  birthYear: BirthYear;
  birthQuarter: BirthQuarter;
  kindergarten: ObjectId;
  isDeleted: boolean;
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

  delete() {
    this.props.isDeleted = true;

    this.apply(new ChildDeletedEvent(this.id, this.id));
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
