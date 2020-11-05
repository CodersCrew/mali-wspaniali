import { Props } from 'src/shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type FirstnameValue = Props<string>;

export class Firstname extends ValueObject<string> {
  private constructor(props: FirstnameValue) {
    super(props);
  }

  public static create(value: string): Result<Firstname> {
    const isNull = Guard.againstNullOrUndefined(value, 'Firstname');

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (value.length < 3 || value.length > 40) {
      return Result.fail('Firstname must be valid');
    }

    return Result.ok(new Firstname({ value }));
  }
}
