import { Props } from 'src/shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';
import { Guard } from '../../../shared/utils/guard';

type Value = Props<boolean | undefined>;

export class IsDeleted extends ValueObject<boolean> {
  private constructor(props: Value) {
    super(props);
  }

  public static create(value?: boolean | undefined): Result<IsDeleted> {
    if (typeof value !== 'boolean' && typeof value !== 'undefined') {
      return Result.fail('IsDeleted must be valid');
    }

    return Result.ok(new IsDeleted({ value: value || false }));
  }
}
