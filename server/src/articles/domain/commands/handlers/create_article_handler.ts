import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateArticleCommand } from '../impl';
import { ArticlesRepository } from '../../repositories/article_repository';
import { Article } from '../../models/article_model';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    private repository: ArticlesRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateArticleCommand): Promise<Article> {
    const { articleProps } = command;

    const article = this.publisher.mergeObjectContext(
      await this.repository.create(articleProps),
    );

    article.commit();

    return article;
  }
}
