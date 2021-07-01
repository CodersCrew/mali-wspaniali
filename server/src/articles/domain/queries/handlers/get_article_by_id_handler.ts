import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticleByIdQuery } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@QueryHandler(GetArticleByIdQuery)
export class GetArticleByIdHandler
  implements IQueryHandler<GetArticleByIdQuery> {
  constructor(private repository: ArticlesRepository) {}

  async execute(query: GetArticleByIdQuery): Promise<Article> {
    return this.repository.get(query.id);
  }
}
