import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleUpdatedEvent } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@EventsHandler(ArticleUpdatedEvent)
export class ArticleUpdatedHandler
  implements IEventHandler<ArticleUpdatedEvent> {
  constructor(private articleRepository: ArticlesRepository) {}

  handle({ id, updates }: ArticleUpdatedEvent): void {
    this.articleRepository.update(id, updates);
  }
}
