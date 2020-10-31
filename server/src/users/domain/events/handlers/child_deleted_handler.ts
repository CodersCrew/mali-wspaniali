import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from '../impl';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  async handle(event: UserCreatedEvent): Promise<void> {
    // todo
  }
}
