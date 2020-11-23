import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type Value = Props<string>;

export class KindergartenTitle extends ValueObject<string> {
  private constructor(props: Value) {
    super(props);
  }

  public static create(value: string): Result<KindergartenTitle> {
    const isNull = Guard.againstNullOrUndefined(value, 'KindergartenTitle');

    if (!isNull.succeeded) {
      return Result.fail(isNull.message);
    }

    if (value.length < 3 || value.length > 40) {
      return Result.fail('KindergartenTitle must be valid');
    }

    return Result.ok(new KindergartenTitle({ value }));
  }
}
