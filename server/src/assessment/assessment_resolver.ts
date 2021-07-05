import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Parent,
  Int,
  Context,
} from '@nestjs/graphql';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CreateAssessmentCommand } from './domain/commands/impl/create_assessment_command';
import {
  AssessmentInput,
  UpdatedAssessmentInput,
} from './inputs/assessment_input';
import { AssessmentDTO } from './dto/assessment_dto';
import { GetAllAssessmentsQuery } from './domain/queries/impl/get_all_assessments_query';
import { Assessment, AssessmentCore } from './domain/models/assessment_model';
import { UpdateAssessmentCommand } from './domain/commands/impl/update_assessment_command';
import { AssessmentMapper } from './domain/mappers/assessment_mapper';
import {
  GetAllAssessmentsAssignedToInstructorQuery,
  GetAssessmentsQuery,
} from './domain/queries/impl';
import { CurrentUser, LoggedUser } from '../users/params/current_user_param';
import { GetResultsQuery } from '../users/domain/queries/impl/get_results_query';
import { GetChildrenFromKindergartenQuery } from '../users/domain/queries/impl/get_children_from_kindergarten_query';
import { countResults } from '../shared/utils/count_results';

@UseInterceptors(SentryInterceptor)
@Resolver(() => AssessmentDTO)
export class AssessmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @ResolveField(() => Int)
  @UseGuards(GqlAuthGuard)
  async firstMeasurementResultCount(
    @Parent() assessment: AssessmentDTO,
  ): Promise<number> {
    const results = await this.queryBus.execute(
      new GetResultsQuery(assessment._id),
    );

    return countResults(results, 'first');
  }

  @ResolveField(() => Int)
  @UseGuards(GqlAuthGuard)
  async lastMeasurementResultCount(
    @Parent() assessment: AssessmentDTO,
  ): Promise<number> {
    const results = await this.queryBus.execute(
      new GetResultsQuery(assessment._id),
    );

    return countResults(results, 'last');
  }

  @ResolveField(() => Int)
  @UseGuards(GqlAuthGuard)
  async maxResultCount(@Parent() assessment: AssessmentDTO): Promise<number> {
    const childrenResults = assessment.kindergartens.map(kindergarten => {
      return this.queryBus.execute(
        new GetChildrenFromKindergartenQuery(kindergarten.kindergartenId),
      );
    });

    const children = await Promise.all(childrenResults);

    return children.flat().length * 8;
  }

  @Mutation(() => AssessmentDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAssessment(
    @Args('assessment') assessment: AssessmentInput,
  ): Promise<AssessmentCore> {
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
  ): Promise<AssessmentCore> {
    const updated: Assessment = await this.commandBus.execute(
      new UpdateAssessmentCommand(id, assessment),
    );

    return AssessmentMapper.toPersist(updated);
  }

  @Query(() => [AssessmentDTO])
  @UseGuards(GqlAuthGuard)
  async assessments(
    @CurrentUser() user: LoggedUser,
  ): Promise<AssessmentCore[]> {
    const assessments: Assessment[] = await this.queryBus.execute(
      user.role === 'instructor'
        ? new GetAllAssessmentsAssignedToInstructorQuery(user.userId)
        : new GetAllAssessmentsQuery(),
    );

    return assessments.map(a => AssessmentMapper.toPersist(a));
  }

  @Query(() => AssessmentDTO)
  @UseGuards(GqlAuthGuard)
  async assessment(
    @Args('id') id: string,
    @Context() context,
  ): Promise<AssessmentCore> {
    const assessment: Assessment | undefined = await this.queryBus.execute(
      new GetAssessmentsQuery(id),
    );

    if (!assessment) return null;

    context.req.assessmentId = assessment.id;

    return AssessmentMapper.toPersist(assessment);
  }
}
