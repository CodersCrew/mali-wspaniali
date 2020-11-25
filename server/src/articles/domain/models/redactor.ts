import { ValueObject } from '../../../shared/domain/value_object';
import { Url } from '../../../shared/domain/url';
import { Props } from '../../../shared/domain/value_object';
import { Firstname, Lastname } from '../../../users/domain/models';

export interface RedactorProps {
  readonly avatarUrl?: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export interface RedactorInnerProps {
  readonly avatarUrl?: Url;
  readonly firstName: Firstname;
  readonly lastName?: Lastname;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export class Redactor extends ValueObject<RedactorInnerProps> {
  private constructor(props: Props<RedactorInnerProps>) {
    super(props);
  }

  static create(props: RedactorInnerProps): Redactor {
    return new Redactor({ value: props });
  }
}
