import { ValueObject } from '../../../shared/domain/value_object';
import { Url } from '../../../shared/domain/url';

export interface RedactorProps {
  readonly avatarUrl?: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export interface RedactorInnerProps {
  readonly avatarUrl?: Url;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly shortDescription?: string;
}

export class Redactor extends ValueObject<RedactorInnerProps> {
  private constructor(props: RedactorInnerProps) {
    super(props);
  }

  getValue(): RedactorProps {
    const mappedProps = {
      ...this.props,
      avatarUrl: this.props.avatarUrl.value,
    };

    return mappedProps;
  }

  static create(props: RedactorProps): Redactor {
    const avatarUrl = Url.create(props.avatarUrl).getValue();

    const mappedProps = {
      ...props,
      avatarUrl,
    };
    return new Redactor(mappedProps);
  }
}
