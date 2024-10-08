import {
  CommandHandler,
  EventPublisher,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';

import { GetArticleByIdQuery } from '../../queries/impl/get_article_by_id_query';
import { UpdateArticleCommand } from '../impl';
import { Article } from '../../models/article_model';

@CommandHandler(UpdateArticleCommand)
export class UpdateArticleHandler
  implements ICommandHandler<UpdateArticleCommand> {
  constructor(
    private commandBus: QueryBus,
    private publisher: EventPublisher,
  ) {}

  async execute(command: UpdateArticleCommand): Promise<Article> {
    const { updates } = command;

    const article = await this.publisher.mergeObjectContext<Article>(
      await this.commandBus.execute(new GetArticleByIdQuery(updates._id)),
    );

    article.update(updates);

    article.commit();

    return article;
  }
}
