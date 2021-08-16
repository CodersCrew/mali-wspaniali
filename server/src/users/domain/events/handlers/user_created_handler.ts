import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from '../impl';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_codes_repository';
import { UserRepository } from '../../repositories/user_repository';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createUserCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';
import { CreateConfirmationRequestCommand } from '../../commands/impl/create_confirmation_request_command';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(
    private keyCodeRepository: KeyCodeRepository,
    private userRepository: UserRepository,
    private notificationRepository: NotificationRepository,
    private commandBus: CommandBus,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { keyCode, userId } = event;

    await this.keyCodeRepository.removeKeyCode(keyCode);

    const createdUser = await this.userRepository.get(userId);

    this.commandBus.execute(
      new CreateConfirmationRequestCommand(createdUser.id),
    );

    this.userRepository.forEachAdmin(admin => {
      {
        const adminId = admin._id;

        this.notificationRepository.create(
          createUserCreatedNotification([adminId], [createdUser.mail]),
        );
      }
    });
  }
}
