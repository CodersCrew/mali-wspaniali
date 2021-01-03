import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CreateAssessmentCommand } from './domain/commands/impl/create_assessment_command';
import { ReturnedStatusDTO } from '../shared/returned_status';
import {
  AssessmentInput,
  UpdatedAssessmentInput,
} from './inputs/assessment_input';
import { AssessmentDTO } from './dto/assessment_dto';
import { GetAllAssessmentsQuery } from './domain/queries/impl/get_all_assessments_query';
import { Assessment, AssessmentDto } from './domain/models/assessment_model';
import { EditAssessmentCommand } from './domain/commands/impl/edit_assessment_command';
import { AssessmentMapper } from './domain/mappers/assessment_mapper';
import {
  GetAllAssessmentsAssignedToInstructorQuery,
  GetAssessmentsQuery,
} from './domain/queries/impl';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';

@UseInterceptors(SentryInterceptor)
@Resolver(() => AssessmentDTO)
export class AssessmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => AssessmentDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAssessment(
    @Args('assessment') assessment: AssessmentInput,
  ): Promise<AssessmentDto> {
    const created: Assessment = await this.commandBus.execute(
      new CreateAssessmentCommand(assessment),
    );

    return AssessmentMapper.toPersist(created);
  }

  @Mutation(() => AssessmentDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async updateAssessment(
    @Args('id') id: string,
    @Args('assessment') assessment: UpdatedAssessmentInput,
  ): Promise<AssessmentDto> {
    const updated: Assessment = await this.commandBus.execute(
      new EditAssessmentCommand(id, assessment),
    );

    return AssessmentMapper.toPersist(updated);
  }

  @Query(() => [AssessmentDTO])
  @UseGuards(GqlAuthGuard)
  async assessments(@CurrentUser() user: LoggedUser): Promise<AssessmentDto[]> {
    const assessments: Assessment[] = await this.queryBus.execute(
      user.role === 'instructor'
        ? new GetAllAssessmentsAssignedToInstructorQuery(user.userId)
        : new GetAllAssessmentsQuery(),
    );

    return assessments.map(a => AssessmentMapper.toPersist(a));
  }

  @Query(() => AssessmentDTO)
  @UseGuards(GqlAuthGuard)
  async assessment(@Args('id') id: string): Promise<AssessmentDto> {
    const assessment: Assessment | undefined = await this.queryBus.execute(
      new GetAssessmentsQuery(id),
    );

    if (!assessment) return null;

    return AssessmentMapper.toPersist(assessment);
  }
}
