import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createKindergartenCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';
import { KindergartenCreatedEvent } from '../impl';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';

@EventsHandler(KindergartenCreatedEvent)
export class KindergartenCreatedHandler
  implements IEventHandler<KindergartenCreatedEvent> {
  constructor(
    private readonly kindergartenRepository: KindergartenRepository,
    private readonly userRepository: UserRepository,
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async handle({ kindergartenId }: KindergartenCreatedEvent): Promise<void> {
    const kindergarten = await this.kindergartenRepository.get(kindergartenId);

    const users = await this.userRepository.getAll('admin');

    this.notificationRepository.create(
      createKindergartenCreatedNotification(
        users.map(u => u._id),
        kindergarten.name,
      ),
    );
  }
}
