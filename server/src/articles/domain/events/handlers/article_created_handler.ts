import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleCreatedEvent } from '../impl/article_created_event';

@EventsHandler(ArticleCreatedEvent)
export class ArticleCreatedHandler
  implements IEventHandler<ArticleCreatedEvent> {
  handle(event: ArticleCreatedEvent) {
    // console.log('[event] ArticleCreated');
  }
}
