import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NewsletterCreatedEvent } from '../impl';

@EventsHandler(NewsletterCreatedEvent)
export class NewsletterCreatedHandler
  implements IEventHandler<NewsletterCreatedEvent> {
  handle(): void {
    // create event
  }
}
