import { ValueObject, Props } from './value_object';
import { Result } from './result';

export type UrlProps = string;

export type UrlValue = Props<UrlProps>;

export class Url extends ValueObject<UrlValue> {
  private constructor(props: UrlValue) {
    super(props);
  }

  get value(): UrlProps {
    return this.props.value;
  }

  public static create(url: string) {
    const IsUrlRegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

    if (url && !IsUrlRegExp.test(url)) {
      return Result.fail<UrlValue>('Url must be valid.');
    } else {
      return Result.ok<UrlValue>(new Url({ value: url }));
    }
  }
}
