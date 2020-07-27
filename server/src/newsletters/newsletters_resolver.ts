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
import { Newsletter, NewsletterProps } from './domain/models/newsletter_model';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { NewsletterKindergartenInput } from './inputs/newsletter_kinderkarten_input';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class NewsletterResolver {
  constructor(
    private commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query(() => [NewsletterDTO])
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async newsletters(): Promise<NewsletterProps[]> {
    const newsletters: Newsletter[] = await this.queryBus.execute(
      new GetAllNewsletterQuery(),
    );

    return newsletters.map(
      newsletter => newsletter.getProps() as NewsletterProps,
    );
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createNewsletter(
    @Args('newsletter') newsletter: NewsletterInput,
  ): Promise<{ status: boolean }> {
    const newNewsletter: Newsletter = await this.commandBus.execute(
      new CreateNewsletterCommand(newsletter),
    );

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
