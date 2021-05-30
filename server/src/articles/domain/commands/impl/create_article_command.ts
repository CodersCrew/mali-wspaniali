import { CreateArticleInput } from '../../../inputs/article_input';

export class CreateArticleCommand {
  constructor(public readonly articleProps: CreateArticleInput) {}
}
