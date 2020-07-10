import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../impl/article_created_event';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent> {
  handle(): void {
    // console.log('[event] ArticleCreated'); - notify all users
  }
}
