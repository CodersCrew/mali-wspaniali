import { ArticleInput } from '../../../inputs/article_input';

export class UpdateArticleCommand {
  constructor(
    public readonly id: string,
    public readonly updates: Partial<ArticleInput>,
  ) {}
}
