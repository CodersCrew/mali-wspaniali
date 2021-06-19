import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AnonymizeUserCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { User } from '../../models/user_model';

@CommandHandler(AnonymizeUserCommand)
export class AnonymizeUserHandler
  implements ICommandHandler<AnonymizeUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({ userId }: AnonymizeUserCommand): Promise<User> {
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.get(userId),
    );

    user.delete();

    user.commit();

    return user;
  }
}
