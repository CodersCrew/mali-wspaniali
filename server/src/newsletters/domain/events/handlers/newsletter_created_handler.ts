import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NewsletterCreatedEvent } from '../impl';
import { NewslettersRepository } from '../../repositories/newsletters_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';
import { getTemplate } from '../../../../shared/services/send_mail/getTemplate';
import { ChildRepository } from '../../../../users/domain/repositories/child_repository';
import { Child } from '../../../../users/domain/models';
import { User } from '../../../../users/domain/models/user_model';
import { NewsletterCore } from '../../models/newsletter_model';

@EventsHandler(NewsletterCreatedEvent)
export class NewsletterCreatedHandler
  implements IEventHandler<NewsletterCreatedEvent> {
  constructor(
    private repository: NewslettersRepository,
    private sendMail: SendMail,
    private userRepository: UserRepository,
    private childRepository: ChildRepository,
  ) {}

  async handle({ newsletter }: NewsletterCreatedEvent): Promise<string[]> {
    let errors: string[] = [];
    await this.repository.create(newsletter);

    if (
      newsletter.recipients.length === 1 &&
      newsletter.recipients[0] === 'fundacja@mali-wspaniali.pl'
    ) {
      errors = await this.sendMailWith(newsletter, newsletter.recipients);
    }

    if (newsletter.type.includes('ALL')) {
      const users = await this.userRepository.getAll({ role: 'parent' });

      errors = await this.sendMailWith(
        newsletter,
        users.map(u => u.mail),
      );
    }

    if (newsletter.type.includes('SINGLE')) {
      const children = await this.getUserFromKindergartens(
        newsletter.recipients,
      );

      const parents = await this.userRepository.getByChildren(
        children.map(c => c.id),
      );

      errors = await this.sendMailWith(
        newsletter,
        parents.map(u => u.mail),
      );
    }

    if (errors.length) {
      console.error('send mail ERRORS:', errors);
    }

    return errors;
  }

  async sendMailWith(
    newsletter: NewsletterCore,
    bcc: string[],
  ): Promise<string[]> {
    return await this.sendMail.send({
      from: process.env.SENDER,
      bcc,
      subject: newsletter.title,
      html: getTemplate({
        title: newsletter.title,
        content: newsletter.message,
      }),
      text: '',
    });
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
