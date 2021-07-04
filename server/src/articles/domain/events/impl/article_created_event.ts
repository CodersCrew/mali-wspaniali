import { ArticleCore } from '../../models/article_model';

export class ArticleCreatedEvent {
  constructor(public articleId: string, public article: ArticleCore) {}
}
