import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { UpdateUserCommand } from '../impl';
import { User } from '../../models/user_model';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: UpdateUserCommand): Promise<User> {
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.get(command.userId),
    );

    user.setFullname(command.update);

    user.commit();

    return user;
  }
}
