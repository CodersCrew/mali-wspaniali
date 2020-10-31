import { Props } from 'src/shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

type ObjectIdValue = Props<string | undefined>;

export class ObjectId extends ValueObject<string | undefined> {
  private constructor(props: ObjectIdValue) {
    super(props);
  }

  isEmpty(): boolean {
    return !this.props.value;
  }

  public static create(value: string | undefined): Result<ObjectId> {
    return Result.ok(new ObjectId({ value }));
  }
}
