import { ValueObject } from '../../../shared/domain/value_object';
import { Url } from '../../../shared/domain/url';
import { Props } from '../../../shared/domain/value_object';
import { Firstname, Lastname } from '../../../users/domain/models';

export interface RedactorProps {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  profession?: string;
  shortDescription?: string;
  biography?: string;
}

export interface RedactorInnerProps {
  firstName: Firstname;
  lastName: Lastname;
  avatarUrl?: Url;
  profession?: string;
  shortDescription?: string;
  biography?: string;
}

export class Redactor extends ValueObject<RedactorInnerProps> {
  private constructor(props: Props<RedactorInnerProps>) {
    super(props);
  }

  static create(props: RedactorInnerProps): Redactor {
    return new Redactor({ value: props });
  }

  get firstName(): Firstname {
    return this.props.value.firstName;
  }

  get lastName(): Lastname {
    return this.props.value.lastName;
  }

  get avatarUrl(): Url | undefined {
    return this.props.value.avatarUrl;
  }

  get profession(): string | undefined {
    return this.props.value.profession;
  }

  get shortDescription(): string | undefined {
    return this.props.value.shortDescription;
  }

  get biography(): string | undefined {
    return this.props.value.biography;
  }
}
