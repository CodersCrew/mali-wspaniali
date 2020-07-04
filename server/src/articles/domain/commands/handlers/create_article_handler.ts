import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateArticleCommand } from '../impl/create_article_command';
import { ArticlesRepository } from '../../repositories/article_repository';

@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler
  implements ICommandHandler<CreateArticleCommand> {
  constructor(
    private readonly repository: ArticlesRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateArticleCommand) {
    const { articleProps } = command;

    const article = this.publisher.mergeObjectContext(
      await this.repository.create(articleProps),
    );

    article.sendNotifications('all');
    article.commit();

    return article;
  }
}
