import { UpdatedUserInput } from '../../../inputs/user_input';

export class UpdateUserCommand {
  constructor(public userId: string, public update: UpdatedUserInput) {}
}
