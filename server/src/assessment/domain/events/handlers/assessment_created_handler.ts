import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { AssessmentCreatedEvent } from '../impl';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { createAssessmentCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';

@EventsHandler(AssessmentCreatedEvent)
export class AssessmentCreatedHandler
  implements IEventHandler<AssessmentCreatedEvent> {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
  ) {}

  async handle({ assessment }: AssessmentCreatedEvent) {
    const users = await this.userRepository.getAll('admin');

    this.notificationRepository.create(
      createAssessmentCreatedNotification(
        users.map(u => u.id),
        [assessment.title],
      ),
    );
  }
}
