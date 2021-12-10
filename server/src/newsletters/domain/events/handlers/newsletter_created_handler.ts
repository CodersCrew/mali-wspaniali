import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NewsletterCreatedEvent } from '../impl';
import { NewslettersRepository } from '../../repositories/newsletters_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';
import { getTemplate } from '../../../../shared/services/send_mail/getTemplate';
import { ChildRepository } from '../../../../users/domain/repositories/child_repository';
import { Child } from '../../../../users/domain/models';

@EventsHandler(NewsletterCreatedEvent)
export class NewsletterCreatedHandler
  implements IEventHandler<NewsletterCreatedEvent> {
  constructor(
    private repository: NewslettersRepository,
    private sendMail: SendMail,
    private userRepository: UserRepository,
    private childRepository: ChildRepository,
  ) {}

  async handle({ newsletter }: NewsletterCreatedEvent): Promise<void> {
    await this.repository.create(newsletter);

    if (
      newsletter.recipients.length === 1 &&
      newsletter.recipients[0] === 'fundacja@mali-wspaniali.pl'
    ) {
      await this.sendMail.send({
        from: process.env.SENDER,
        bcc: newsletter.recipients,
        subject: newsletter.title,
        html: getTemplate({
          title: newsletter.title,
          content: newsletter.message,
        }),
        text: '',
      });
    }

    if (newsletter.type.includes('ALL')) {
      const users = await this.userRepository.getAll({ role: 'parent' });

      await this.sendMail.send({
        from: process.env.SENDER,
        bcc: users.map(u => u.mail),
        subject: newsletter.title,
        html: getTemplate({
          title: newsletter.title,
          content: newsletter.message,
        }),
        text: '',
      });
    }

    if (newsletter.type.includes('SINGLE')) {
      console.log(newsletter);
      const children = await this.getUserFromKindergartens(
        newsletter.recipients,
      );

      const parents = await this.userRepository.getByChildren(
        children.map(c => c.id),
      );

      await this.sendMail.send({
        from: process.env.SENDER,
        bcc: parents.map(u => u.mail),
        subject: newsletter.title,
        html: getTemplate({
          title: newsletter.title,
          content: newsletter.message,
        }),
        text: '',
      });
    }
  }

  getUserFromKindergartens(kindergartenIds: string[]) {
    const getChildrenFromKindergarten = async (
      acc: Promise<Child[]>,
      curr: string,
    ) => {
      const children = await this.childRepository.getByKindergarten(curr);

      return [...(await acc), ...children];
    };

    return kindergartenIds.reduce(
      getChildrenFromKindergarten,
      Promise.resolve([] as Child[]),
    );
  }
}
