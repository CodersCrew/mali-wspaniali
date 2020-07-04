import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetLastArticlesQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@QueryHandler(GetLastArticlesQuery)
export class GetLastArticlesHandler
  implements IQueryHandler<GetLastArticlesQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute(query: GetLastArticlesQuery): Promise<Article[]> {
    return this.repository.getLast(query.count);
  }
}
