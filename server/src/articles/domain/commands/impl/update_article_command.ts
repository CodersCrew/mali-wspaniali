import { UpdateArticleInput } from '../../../inputs/article_input';

export class UpdateArticleCommand {
  constructor(public updates: Partial<UpdateArticleInput>) {}
}
