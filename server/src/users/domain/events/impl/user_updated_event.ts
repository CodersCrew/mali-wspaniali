import { UserProps } from '../../models/user_model';

export class UserUpdatedEvent {
  constructor(
    public readonly userId: string,
    public readonly updates: Partial<UserProps>,
  ) {}
}
