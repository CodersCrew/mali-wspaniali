import { CreateArticleInput } from '@articles/inputs/article_input';

export class ArticleUpdatedEvent {
  constructor(
    public id: string,
    public updates: Partial<CreateArticleInput>,
    public options: { increeseField?: string } = {},
  ) {}
}
