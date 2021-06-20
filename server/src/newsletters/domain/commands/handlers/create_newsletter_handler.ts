import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateNewsletterCommand } from '../impl/create_newsletter_command';
import { Newsletter } from '../../models/newsletter_model';
import { NewsletterMapper } from '../../mappers/newsletter_mapper';

@CommandHandler(CreateNewsletterCommand)
export class CreateNewsletterHandler
  implements ICommandHandler<CreateNewsletterCommand> {
  constructor(private publisher: EventPublisher) {}

  async execute(command: CreateNewsletterCommand): Promise<Newsletter> {
    const { newsletterProps } = command;

    const newsletter = this.publisher.mergeObjectContext(
      NewsletterMapper.toDomain(newsletterProps, { isNew: true }),
    );

    newsletter.commit();

    return newsletter;
  }
}
