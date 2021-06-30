import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChildCreatedEvent } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createChildNotification } from '../../../../notifications/domain/repositories/notification_factory';

@EventsHandler(ChildCreatedEvent)
export class ChildCreatedHandler implements IEventHandler<ChildCreatedEvent> {
  constructor(
    private userRepository: UserRepository,
    private notificationRepository: NotificationRepository,
  ) {}

  async handle({ childId }: ChildCreatedEvent): Promise<void> {
    const [user] = await this.userRepository.getByChildren([childId]);

    if (user) {
      await this.notificationRepository.create(
        createChildNotification(user.id),
      );
    }
  }
}
