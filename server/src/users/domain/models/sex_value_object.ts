import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

type SexValue = Props<'male' | 'female'>;

export class Sex extends ValueObject<'male' | 'female'> {
  private constructor(props: SexValue) {
    super(props);
  }

  public static create(value: string): Result<Sex> {
    if (!['male', 'female'].includes(value)) {
      return Result.fail(
        `Sex must be either "male" or "female", but got "${value}"`,
      );
    }

    return Result.ok(new Sex({ value: value as 'male' | 'female' }));
  }
}
