import { AggregateRoot } from '@nestjs/cqrs';

import {
  UserConfirmedEvent,
  UserCreatedEvent,
  UserSignedAgreementEvent,
  UserUnsignedAgreementEvent,
  UserUpdatedEvent,
  UserAnonymizedEvent,
} from '../events/impl';
import { CoreModel } from '../../../shared/utils/core_model';
import { Expose, Transform } from 'class-transformer';

export class UserCore extends CoreModel {
  @Expose()
  @Transform(value => value ?? null)
  firstname: string;

  @Expose()
  @Transform(value => value ?? null)
  lastname: string;

  @Expose()
  mail: string;

  @Expose()
  password: string;

  @Expose()
  @Transform(value => value ?? [])
  children: string[];

  @Expose()
  @Transform(value => value ?? [])
  agreements: string[];

  @Expose()
  role: string;

  @Expose()
  @Transform(value => value ?? false)
  isConfirmed: boolean;
}

export class User extends AggregateRoot {
  private constructor(private props: UserCore) {
    super();
  }

  get id(): string {
    return this.props._id;
  }

  get mail(): string {
    return this.props.mail;
  }

  get password(): string {
    return this.props.password;
  }

  get children(): string[] {
    return this.props.children;
  }

  get agreements(): string[] {
    return this.props.agreements;
  }

  hasAgreement(potentialAgreementId): boolean {
    return this.props.agreements.includes(potentialAgreementId);
  }

  private setAgreements(agreements: string[]) {
    this.props.agreements = agreements;
  }

  get confirmed(): boolean {
    return this.props.isConfirmed;
  }

  get role(): string {
    return this.props.role;
  }

  getProps(): UserCore {
    return this.props;
  }

  confirm(): void {
    this.props.isConfirmed = true;

    this.apply(new UserConfirmedEvent(this.props._id));
    this.apply(new UserUpdatedEvent(this.props._id, { isConfirmed: true }));
  }

  delete(): void {
    const { props } = this;

    this.props = { ...props, isDeleted: true, mail: '', password: '' };

    this.apply(
      new UserUpdatedEvent(props._id, {
        isDeleted: true,
        mail: '',
        password: '',
      }),
    );

    this.apply(new UserAnonymizedEvent(this.id));
  }

  isDeleted(): boolean {
    return this.props.isDeleted;
  }

  signAgreement(potentialAgreementId: string) {
    this.setAgreements([...this.agreements, potentialAgreementId]);
    this.apply(
      new UserSignedAgreementEvent(this.props._id, potentialAgreementId),
    );
  }

  unsignAgreement(potentialAgreementId: string) {
    this.setAgreements(
      this.agreements.filter(agreement => agreement !== potentialAgreementId),
    );
    this.apply(
      new UserUnsignedAgreementEvent(this.props._id, potentialAgreementId),
    );
  }

  setFullname(options: { firstname: string; lastname: string }) {
    this.props = { ...this.props, ...options };

    this.apply(new UserUpdatedEvent(this.props._id, options));
  }

  static create(props: UserCore, keyCode: string): User {
    const user = new User(props);

    user.apply(new UserCreatedEvent(user.props._id, keyCode));

    return user;
  }

  static recreate(props: UserCore): User {
    const user = new User(props);

    return user;
  }
}
