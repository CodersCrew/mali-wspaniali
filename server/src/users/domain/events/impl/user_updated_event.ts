import { UserCore } from '../../models/user_model';

export class UserUpdatedEvent {
  constructor(public userId: string, public updates: Partial<UserCore>) {}
}
