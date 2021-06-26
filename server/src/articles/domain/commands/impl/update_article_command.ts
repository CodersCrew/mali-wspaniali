import { CreateArticleInput } from '../../../inputs/article_input';

export class UpdateArticleCommand {
  constructor(public id: string, public updates: Partial<CreateArticleInput>) {}
}
