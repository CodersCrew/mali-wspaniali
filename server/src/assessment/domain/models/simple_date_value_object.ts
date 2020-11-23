import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type Value = Props<string>;

export class SimpleDate extends ValueObject<string> {
  private constructor(props: Value) {
    super(props);
  }

  public static create(value: string): Result<SimpleDate> {
    const isNull = Guard.againstNullOrUndefined(value, 'SimpleDate');

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (!Date.parse(value)) {
      return Result.fail('SimpleDate must be valid');
    }

    return Result.ok(new SimpleDate({ value }));
  }
}
