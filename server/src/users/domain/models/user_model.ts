import { AggregateRoot } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { UserConfirmedEvent, UserCreatedEvent } from '../events/impl';
import { Mail } from '../../../shared/domain/mail';
import { NotificationProps } from '../../../notifications/domain/models/notification_model';
import { ChildProps } from './child_model';
import { AgreementProps } from '../../../agreements/schemas/agreement_schema';

export interface UserProps {
  readonly _id: string;
  readonly date: Date;
  mail: string;
  readonly password: string;
  readonly role: string;
  notifications: NotificationProps[];
  children: string[] | mongoose.Schema.Types.ObjectId[] | ChildProps[];
  agreements: string[];
  confirmed: boolean;
}

export interface UserBeforeSaveProps {
  mail: string;
  readonly password: string;
}

export class User extends AggregateRoot {
  private constructor(private readonly props: UserProps | UserBeforeSaveProps) {
    super();

    this.props.mail = Mail.create(props.mail).getValue().value;
  }

  get id(): string {
    return (this.props as UserProps)._id;
  }

  get mail(): string {
    return this.props.mail;
  }

  get agreements(): string[] {
    return (this.props as UserProps).agreements;
  }

  get confirmed(): boolean {
    if (isUserProps(this.props)) {
      return this.props.confirmed;
    }

    return false;
  }

  confirm(): void {
    if (isUserProps(this.props)) {
      this.props.confirmed = true;

      this.apply(new UserConfirmedEvent(this.props._id));
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
