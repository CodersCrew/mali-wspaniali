import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Types } from 'mongoose';

type ObjectIdValue = Props<string | undefined>;

export class ObjectId extends ValueObject<string | undefined> {
  private constructor(props: ObjectIdValue) {
    super(props);
  }

  isEmpty(): boolean {
    return !this.props.value;
  }

  toString(): string {
    return this.props.value.toString();
  }

  toMongoId(): Types.ObjectId {
    return Types.ObjectId(this.props.value.toString());
  }

  public static create(value?: string | undefined): Result<ObjectId> {
    return Result.ok(new ObjectId({ value }));
  }
}
