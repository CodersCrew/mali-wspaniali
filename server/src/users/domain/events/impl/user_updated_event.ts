import { UserCore } from '../../models/user_model';

export class UserUpdatedEvent {
  constructor(
    public readonly userId: string,
    public readonly updates: Partial<UserCore>,
  ) {}
}
