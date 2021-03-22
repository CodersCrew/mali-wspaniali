import { AggregateRoot } from '@nestjs/cqrs';

export interface AgreementProps {
  _id: string;
  date: Date;
  text: string;
  isOutdated: boolean;
  isSigned: boolean;
}

export class Agreement extends AggregateRoot {
  private constructor(private readonly props: AgreementProps) {
    super();
  }

  get id(): string {
    return this.props._id;
  }

  isSigned() {
    return this.props.isSigned ?? false;
  }

  toObject(): AgreementProps {
    return this.props;
  }

  static create(value: AgreementProps) {
    return new Agreement(value);
  }
}
