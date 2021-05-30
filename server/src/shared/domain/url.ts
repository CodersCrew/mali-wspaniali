import { ValueObject, Props } from './value_object';
import { Result } from './result';

export type UrlProps = string;

export type UrlValue = Props<UrlProps>;

export class Url extends ValueObject<UrlProps> {
  private constructor(props: UrlValue) {
    super(props);
  }

  public static create(url: string): Result<Url> {
    const IsUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (url && !IsUrlRegExp.test(url)) {
      return Result.fail('Url must be valid.');
    } else {
      return Result.ok(new Url({ value: url }));
    }
  }
}
