import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { UserUpdatedEvent } from '../impl';

@EventsHandler(UserUpdatedEvent)
export class UserUpdatedHandler implements IEventHandler<UserUpdatedEvent> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({ userId, updates }: UserUpdatedEvent): Promise<void> {
    await this.userRepository.update(userId, updates);
  }
}
