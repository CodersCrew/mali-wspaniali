import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CreateAssessmentCommand } from './domain/commands/impl/create_assessment_command';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { CreateAssessmentInput } from './inputs/create_assessment_input';
import { AssessmentDTO } from './dto/assessment_dto';
import { GetAllAssessmentsQuery } from './domain/queries/impl/get_all_assessments_query';

@UseInterceptors(SentryInterceptor)
@Resolver()
export class AssessmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAssessment(
    @Args('assessment') assessment: CreateAssessmentInput,
  ): Promise<ReturnedStatusDTO> {
    const created: boolean = await this.commandBus.execute(
      new CreateAssessmentCommand(assessment),
    );

    return { status: !!created };
  }

  @Query(() => [AssessmentDTO])
  @UseGuards(GqlAuthGuard)
  async assessments() {
    const assessments = await this.queryBus.execute(
      new GetAllAssessmentsQuery(),
    );

    return assessments;
  }
}
