import { Props } from 'src/shared/domain/value_object';
import { ValueObject } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

type BirthYearValue = Props<number>;

export class BirthYear extends ValueObject<number> {
  private constructor(props: BirthYearValue) {
    super(props);
  }

  public static create(value: number): Result<BirthYear> {
    if (typeof value !== 'number' || value < 0) {
      return Result.fail(`BirthYear must be valid, but got "${value}"`);
    }

    return Result.ok(new BirthYear({ value }));
  }
}
