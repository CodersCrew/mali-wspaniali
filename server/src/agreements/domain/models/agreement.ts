import { AggregateRoot } from '@nestjs/cqrs';
import { Expose, Transform } from 'class-transformer';
import { CoreModel } from '../../../shared/utils/core_model';

export class AgreementCore extends CoreModel {
  @Expose()
  text: string;

  @Expose()
  @Transform(value => value ?? false)
  isOutdated: boolean;

  @Expose()
  @Transform(value => value ?? false)
  isSigned: boolean;
}

export class Agreement extends AggregateRoot {
  private constructor(private readonly props: AgreementCore) {
    super();
  }

  get id(): string {
    return this.props._id;
  }

  isSigned() {
    return this.props.isSigned ?? false;
  }

  setIsSigned(value: boolean) {
    this.props.isSigned = value;
  }

  isOutdated() {
    return this.props.isOutdated;
  }

  getProps(): AgreementCore {
    return this.props;
  }

  static create(value: AgreementCore) {
    return new Agreement(value);
  }
}
