import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ArticleUpdatedEvent } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@EventsHandler(ArticleUpdatedEvent)
export class ArticleUpdatedHandler
  implements IEventHandler<ArticleUpdatedEvent> {
  constructor(private articleRepository: ArticlesRepository) {}

  handle({ id, updates, options }: ArticleUpdatedEvent): void {
    if (options.increeseField) {
      this.articleRepository.increeseAttribute(id, options.increeseField);
    } else {
      this.articleRepository.update(id, updates);
    }
  }
}
