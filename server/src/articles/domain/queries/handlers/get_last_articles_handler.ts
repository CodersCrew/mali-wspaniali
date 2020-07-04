import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLastArticlesQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@QueryHandler(GetLastArticlesQuery)
export class GetLastArticlesHandler
  implements IQueryHandler<GetLastArticlesQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute(query: GetLastArticlesQuery) {
    return this.repository.getLast(query.count);
  }
}
