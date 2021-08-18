import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserConfirmedEvent } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createUserConfirmedNotification } from '../../../../notifications/domain/repositories/notification_factory';

@EventsHandler(UserConfirmedEvent)
export class UserConfirmedHandler implements IEventHandler<UserConfirmedEvent> {
  constructor(
    private userRepository: UserRepository,
    private notificationRepository: NotificationRepository,
  ) {}

  async handle(event: UserConfirmedEvent): Promise<void> {
    const { userId } = event;

    const createdUser = await this.userRepository.get(userId);

    this.userRepository.forEachAdmin(admin => {
      {
        this.notificationRepository.create(
          createUserConfirmedNotification([admin._id], [createdUser.mail]),
        );
      }
    });
  }
}
