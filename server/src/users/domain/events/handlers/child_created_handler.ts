import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChildCreatedEvent } from '../impl';
import { UserRepository } from '../../repositories/user_repository';

@EventsHandler(ChildCreatedEvent)
export class ChildCreatedHandler implements IEventHandler<ChildCreatedEvent> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: ChildCreatedEvent): Promise<void> {
    // todo
  }
}
