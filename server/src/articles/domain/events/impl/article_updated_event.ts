import { CreateArticleInput } from '@articles/inputs/article_input';

export class ArticleUpdatedEvent {
  constructor(
    public readonly id: string,
    public readonly updates: Partial<CreateArticleInput>,
  ) {}
}
