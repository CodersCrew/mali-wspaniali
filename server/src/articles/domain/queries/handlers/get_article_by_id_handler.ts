import { EventPublisher, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticleByIdQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler
  implements IQueryHandler<GetArticleByIdQuery> {
  constructor(
    private repository: ArticlesRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    const article = this.publisher.mergeObjectContext(
      await this.repository.get(query.id),
    );

    article.read();

    article.commit();

    return article;
  }
}
