import { EventPublisher, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserAnonymizedEvent } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { ChildRepository } from '../../repositories/child_repository';

@EventsHandler(UserAnonymizedEvent)
export class UserAnonymizedHandler
  implements IEventHandler<UserAnonymizedEvent> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async handle({ userId }: UserAnonymizedEvent): Promise<void> {
    const user = await this.userRepository.get(userId);

    const children = await this.childRepository.get(user.children);

    children.forEach(async c => {
      const child = this.publisher.mergeObjectContext(c);

      child.delete();

      await child.commit();
    });
  }
}
