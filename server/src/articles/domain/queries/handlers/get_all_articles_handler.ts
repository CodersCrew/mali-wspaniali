import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllArticlesQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@QueryHandler(GetAllArticlesQuery)
export class GetAllArticlesHandler
  implements IQueryHandler<GetAllArticlesQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute({
    page,
    perPage,
    category,
  }: GetAllArticlesQuery): Promise<Article[]> {
    return this.repository.getPage(page, perPage, category);
  }
}
