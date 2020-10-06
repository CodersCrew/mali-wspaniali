import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { EventBus, QueryBus, CommandBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CreateAssessmentCommand } from './domain/commands/impl/create_assessment_command';
import { ReturnedStatusDTO } from '../shared/returned_status';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class AssessmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAssessment(
    @Args('title') title: string,
  ): Promise<ReturnedStatusDTO> {
    const created: boolean = await this.commandBus.execute(
      new CreateAssessmentCommand(title),
    );

    return { status: !!created };
  }
}
