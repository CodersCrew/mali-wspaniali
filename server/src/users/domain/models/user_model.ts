import { AggregateRoot } from '@nestjs/cqrs';

import {
  UserConfirmedEvent,
  UserCreatedEvent,
  UserSignedAgreementEvent,
  UserUnsignedAgreementEvent,
  UserUpdatedEvent,
} from '../events/impl';
import { Mail } from '../../../shared/domain/mail';
import { UserAnonymizedEvent } from '../events/impl/user_anonymized_event';

export interface UserProps {
  readonly _id: string;
  readonly date: Date;
  mail: string;
  readonly password: string;
  readonly role: string;
  notifications: string[];
  children: string[];
  agreements: string[];
  confirmed: boolean;
  deleted: boolean;
}

export interface UserBeforeSaveProps {
  mail: string;
  readonly password: string;
}

export class User extends AggregateRoot {
  private constructor(private props: UserProps | UserBeforeSaveProps) {
    super();

    if (isUserProps(this.props)) {
      if (!this.props.deleted) {
        this.props.mail = Mail.create(props.mail).getValue().value;
      }
    } else {
      this.props.mail = Mail.create(props.mail).getValue().value;
    }
  }

  get id(): string {
    return (this.props as UserProps)._id;
  }

  get mail(): string {
    return this.props.mail;
  }

  get password(): string {
    return this.props.password;
  }

  get children(): string[] {
    return (this.props as UserProps).children;
  }

  get agreements(): string[] {
    return (this.props as UserProps).agreements;
  }

  hasAgreement(potentialAgreementId): boolean {
    return (this.props as UserProps).agreements.includes(potentialAgreementId);
  }

  private setAgreements(agreements: string[]) {
    (this.props as UserProps).agreements = agreements;
  }

  get confirmed(): boolean {
    if (isUserProps(this.props)) {
      return this.props.confirmed;
    }

    return false;
  }

  get role(): string {
    if (!('role' in this.props)) throw Error('Need created user');

    return this.props.role;
  }

  confirm(): void {
    if (isUserProps(this.props)) {
      this.props.confirmed = true;

      this.apply(new UserConfirmedEvent(this.props._id));
    }
  }

  delete(): void {
    const { props } = this;

    if (isUserProps(props)) {
      this.props = { ...props, deleted: true, mail: '', password: '' };

      this.apply(
        new UserUpdatedEvent(props._id, {
          deleted: true,
          mail: '',
          password: '',
        }),
      );
      this.apply(new UserAnonymizedEvent(this.id));
    }
  }

  isDeleted(): boolean {
    if (isUserProps(this.props)) {
      return this.props.deleted;
    }
  }

  signAgreement(potentialAgreementId: string) {
    if (isUserProps(this.props)) {
      this.setAgreements([...this.agreements, potentialAgreementId]);
      this.apply(
        new UserSignedAgreementEvent(this.props._id, potentialAgreementId),
      );
    }
  }

  unsignAgreement(potentialAgreementId: string) {
    if (isUserProps(this.props)) {
      this.setAgreements(
        this.agreements.filter(agreement => agreement !== potentialAgreementId),
      );
      this.apply(
        new UserUnsignedAgreementEvent(this.props._id, potentialAgreementId),
      );
    }
  }

  static create(props: UserProps, keyCode: string): User {
    const user = new User(props);

    if (isUserProps(user.props)) {
      user.apply(new UserCreatedEvent(user.props._id, keyCode));
    }

    return user;
  }

  static recreate(props: UserProps | UserBeforeSaveProps): User {
    const user = new User(props);

    return user;
  }

  getProps(): UserProps | UserBeforeSaveProps {
    return this.props;
  }
}

function isUserProps(v: UserProps | UserBeforeSaveProps): v is UserProps {
  return !!(v as UserProps)._id;
}

function anonymizeUser(user: UserProps) {
  return {
    ...user,
    delete: true,
    mail: '',
    password: '',
  };
}
