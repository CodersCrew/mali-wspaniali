import { ValueObject, Props } from './value_object';
import { Result } from './result';

type MailValue = Props<string>;

const mailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class Mail extends ValueObject<string> {
  private constructor(props: MailValue) {
    super(props);
  }

  public static create(mail: string): Result<MailValue> {
    if (!mailRegexp.test(mail)) {
      return Result.fail<MailValue>('Mail must be valid.');
    } else {
      return Result.ok<MailValue>(new Mail({ value: mail }));
    }
  }
}
