import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { UserDeletedEvent } from '../impl';

@EventsHandler(UserDeletedEvent)
export class UserDeletedHandler implements IEventHandler<UserDeletedEvent> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle({ userId }: UserDeletedEvent): Promise<void> {}
}
