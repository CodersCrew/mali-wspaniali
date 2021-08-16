import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../impl';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';
import { createArticleCreatedNotification } from '../../../../notifications/domain/repositories/notification_factory';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent> {
  constructor(
    private notificationRepository: NotificationRepository,
    private userRepository: UserRepository,
  ) {}

  handle({ article }: ArticleCreatedEvent): void {
    this.userRepository.forEachAdmin(user => {
      {
        const userId = user._id;
        const title = article.title;

        this.notificationRepository.create(
          createArticleCreatedNotification([userId], title),
        );
      }
    });
  }
}
