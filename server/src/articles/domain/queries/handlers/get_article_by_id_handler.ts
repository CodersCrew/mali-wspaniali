import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticleByIdQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler
  implements IQueryHandler<GetArticleByIdQuery> {
  constructor(private readonly repository: ArticlesRepository) {}

  async execute(query: GetArticleByIdQuery) {
    return this.repository.get(query.id);
  }
}
