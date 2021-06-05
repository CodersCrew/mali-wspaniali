import { ValueObject, Props } from './value_object';
import { Result } from './result';

export type TextLengthProps = string;

export type TextLengthValue = Props<TextLengthProps>;

export class TextLength extends ValueObject<TextLengthProps> {
  private constructor(props: TextLengthValue) {
    super(props);
  }

  public static create(
    text: string,
    name: string,
    max: number,
    min = 0,
  ): Result<TextLength> {
    if (text.length < min || text.length > max) {
      return Result.fail(
        `Text in field "${name}" must have valid length. Min: ${min}, Max: ${max}`,
      );
    } else {
      return Result.ok(new TextLength({ value: text }));
    }
  }
}
