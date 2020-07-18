import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from '../impl';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_code_repository';
import { UserRepository } from '../../repositories/user_repository';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createUserCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private readonly keyCodeRepository: KeyCodeRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { keyCode, userId } = event;

    await this.keyCodeRepository.removeKeyCode(keyCode);

    const createdUser = await this.userRepository.get(userId);

    this.userRepository.forEachAdmin(admin => {
      {
        const adminId = admin._id;

        this.notificationRepository.create(
          createUserCreatedNotification(adminId, [createdUser.mail]),
        );
      }
    });
  }
}
