import { ValueObject, Props } from '../../../shared/domain/value_object';
import { Result } from '../../../shared/domain/result';

export type MailProps = string;

type MailValue = Props<MailProps>;

const mailRegexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export class Mail extends ValueObject<MailValue> {
  private constructor(props: MailValue) {
    super(props);
  }

  get value(): MailProps {
    return this.props.value;
  }

  public static create(mail: string) {
    if (!mailRegexp.test(mail)) {
      return Result.fail<MailValue>('Mail must be valid.');
    } else {
      return Result.ok<MailValue>(new Mail({ value: mail }));
    }
  }
}
