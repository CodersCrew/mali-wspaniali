import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllArticlesQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@QueryHandler(GetAllArticlesQuery)
export class GetAllArticlesHandler
  implements IQueryHandler<GetAllArticlesQuery> {
  constructor(private repository: ArticlesRepository) {}

  async execute(query: GetAllArticlesQuery): Promise<Article[]> {
    return this.repository.getPage(
      query.page,
      query.perPage,
      query.user,
      query.category,
    );
  }
}
