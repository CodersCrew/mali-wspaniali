import { AggregateRoot } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../events/impl/article_created_event';
export interface UserProps {
  readonly _id: string;
  readonly date: Date;
  readonly email: string;
  readonly password: string;
}

export class User extends AggregateRoot {
  constructor(private readonly props: UserProps) {
    super();
  }

  removeKeyCode(keyCode: string): void {
    this.apply(new UserCreatedEvent(this.props._id, keyCode));
  }
}
