import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllArticlesQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@QueryHandler(GetAllArticlesQuery)
export class GetAllArticlesHandler
  implements IQueryHandler<GetAllArticlesQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute(query: GetAllArticlesQuery) {
    return this.repository.all(query.page);
  }
}
