import { UserInput } from '../../../inputs/user_input';

export class CreateUserCommand {
  constructor(public readonly userInput: UserInput) {}
}
