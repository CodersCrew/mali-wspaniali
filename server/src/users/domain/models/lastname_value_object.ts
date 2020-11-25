import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type LastnameValue = Props<string>;

export class Lastname extends ValueObject<string> {
  private constructor(props: LastnameValue) {
    super(props);
  }

  public static create(value: string): Result<Lastname> {
    const isNull = Guard.againstNullOrUndefined(value, 'Lastname');

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (value.length < 3 || value.length > 50) {
      return Result.fail('Lastname must be valid');
    }

    return Result.ok(new Lastname({ value }));
  }
}
