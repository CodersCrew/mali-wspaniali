import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../impl/article_created_event';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';
import { createArticleCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent> {
  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly userRepository: UserRepository,
  ) {}

  handle(): void {
    this.userRepository.forEach(user => {
      {
        const userId = user._id;

        this.notificationRepository.create(
          createArticleCreatedNotification(userId),
        );
      }
    });
  }
}
