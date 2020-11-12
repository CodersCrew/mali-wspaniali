import { Props } from 'src/shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type Value = Props<string>;

export class Title extends ValueObject<string> {
  private constructor(props: Value) {
    super(props);
  }

  public static create(value: string): Result<Title> {
    const isNull = Guard.againstNullOrUndefined(value, 'Title');

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (value.length < 5 || value.length > 140) {
      return Result.fail('Title must be valid');
    }

    return Result.ok(new Title({ value }));
  }
}
