import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NewsletterCreatedEvent } from '../impl';
import { NewslettersRepository } from '../../repositories/newsletters_repository';

@EventsHandler(NewsletterCreatedEvent)
export class NewsletterCreatedHandler
  implements IEventHandler<NewsletterCreatedEvent> {
  constructor(private repository: NewslettersRepository) {}

  async handle({ newsletter }: NewsletterCreatedEvent): Promise<void> {
    await this.repository.create(newsletter);
  }
}
