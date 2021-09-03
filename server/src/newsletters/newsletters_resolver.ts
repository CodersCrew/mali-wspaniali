import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import * as Sentry from '@sentry/minimal';

import { NewsletterDTO } from './dto/newsletter_dto';
import { NewsletterInput } from './inputs/newsletter_input';
import { CreateNewsletterCommand } from './domain/commands/impl/create_newsletter_command';
import { GetAllNewsletterQuery } from './domain/queries/impl/get_all_newsletters_query';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { Newsletter, NewsletterCore } from './domain/models/newsletter_model';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { NewsletterKindergartenInput } from './inputs/newsletter_kinderkarten_input';
import { NewsletterMapper } from './domain/mappers/newsletter_mapper';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class NewsletterResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Query(() => [NewsletterDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async newsletters(): Promise<NewsletterCore[]> {
    const newsletters: Newsletter[] = await this.queryBus.execute(
      new GetAllNewsletterQuery(),
    );

    return NewsletterMapper.toPlainMany(newsletters);
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: ['parent', 'admin'] }))
  async createNewsletter(
    @CurrentUser() user: LoggedUser,
    @Args('newsletter') newsletter: NewsletterInput,
  ): Promise<{ status: boolean }> {
    let newNewsletter: Newsletter;

    if (
      user.role === 'parent' &&
      newsletter.recipients[0] === 'fundacja@mali-wspaniali.pl'
    ) {
      newNewsletter = await this.commandBus.execute(
        new CreateNewsletterCommand(newsletter),
      );
    }

    if (user.role === 'admin') {
      newNewsletter = await this.commandBus.execute(
        new CreateNewsletterCommand(newsletter),
      );
    }

    if (!newNewsletter) {
      throw new Error('Message send error');
    }

    const newsletterContent = newNewsletter.getProps();

    if (newsletterContent) {
      Sentry.captureMessage(
        `[Mali Wspaniali]: Created a new newsletter ${newsletterContent.title}`,
      );
    }
    return { status: !!newsletterContent };
  }

  @Mutation(() => ReturnedStatusDTO)
  async createKindergartenNewsletter(
    @Args('newsletter') newsletter: NewsletterKindergartenInput,
  ): Promise<{ status: boolean }> {
    // todo
    return { status: !!newsletter };
  }

  @Mutation(() => ReturnedStatusDTO)
  async createParentNewsletter(
    @Args('newsletter') newsletter: NewsletterKindergartenInput,
  ): Promise<{ status: boolean }> {
    // todo
    return { status: !!newsletter };
  }
}
