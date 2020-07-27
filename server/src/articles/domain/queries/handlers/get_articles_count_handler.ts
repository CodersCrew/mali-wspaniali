import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetArticlesCountQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@QueryHandler(GetArticlesCountQuery)
export class GetArticlesCountHandler
  implements IQueryHandler<GetArticlesCountQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute(): Promise<number> {
    return this.repository.countArticles();
  }
}
