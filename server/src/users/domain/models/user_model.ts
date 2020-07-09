import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/article_created_event';
import { Mail } from './mail';

export interface UserProps {
  readonly _id: string;
  readonly date: Date;
  mail: string;
  readonly password: string;
}

export interface UserBeforeSaveProps {
  mail: string;
  readonly password: string;
}

export class User extends AggregateRoot {
  constructor(private readonly props: UserProps | UserBeforeSaveProps) {
    super();

    this.props.mail = Mail.create(props.mail).getValue().value;
  }

  removeKeyCode(keyCode: string): void {
    if (isUserProps(this.props)) {
      this.apply(new UserCreatedEvent(this.props._id, keyCode));
    }
  }

  getProps(): UserProps | UserBeforeSaveProps {
    return this.props;
  }
}

function isUserProps(v: UserProps | UserBeforeSaveProps): v is UserProps {
  return !!(v as UserProps)._id;
}
