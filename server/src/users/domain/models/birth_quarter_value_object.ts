import { Props } from '../../../shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

type BirthYearValue = Props<number>;

export class BirthQuarter extends ValueObject<number> {
  private constructor(props: BirthYearValue) {
    super(props);
  }

  public static create(value: number): Result<BirthQuarter> {
    if (typeof value !== 'number' || value < 0 || value > 3) {
      return Result.fail(`BirthQuarter must be valid, but got "${value}"`);
    }

    return Result.ok(new BirthQuarter({ value }));
  }
}
