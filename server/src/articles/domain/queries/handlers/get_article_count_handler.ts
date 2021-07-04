import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetArticlesCountQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@QueryHandler(GetArticlesCountQuery)
export class GetArticlesCountHandler
  implements IQueryHandler<GetArticlesCountQuery> {
  constructor(private repository: ArticlesRepository) {}

  async execute({ category }: GetArticlesCountQuery): Promise<number> {
    return this.repository.countArticles(category);
  }
}
