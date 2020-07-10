import { ValueObject, Props } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

export type ReadingTimeProps = number;

export type ReadingTimeValue = Props<ReadingTimeProps>;

export class ReadingTime extends ValueObject<ReadingTimeValue> {
  private constructor(props: ReadingTimeValue) {
    super(props);
  }

  get value(): ReadingTimeProps {
    return this.props.value;
  }

  public static create(time: number): Result<ReadingTimeValue> {
    if (time < 0) {
      return Result.fail<ReadingTimeValue>('ReadingTime must be valid.');
    } else {
      return Result.ok<ReadingTimeValue>(new ReadingTime({ value: time }));
    }
  }
}
