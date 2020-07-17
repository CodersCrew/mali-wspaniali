import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateNewsletterCommand } from '../impl/create_newsletter_command';
import { NewsletterRepository } from '../../repositories/newsletter_repository';
import { Newsletter } from '../../models/newsletter_model';

@CommandHandler(CreateNewsletterCommand)
export class CreateNewsletterHandler
  implements ICommandHandler<CreateNewsletterCommand> {
  constructor(
    private readonly repository: NewsletterRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateNewsletterCommand): Promise<Newsletter> {
    const { newsletterProps } = command;

    const newsletter = this.publisher.mergeObjectContext(
      await this.repository.create(newsletterProps),
    );

    newsletter.commit();

    return newsletter;
  }
}
