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
import * as pick from 'lodash.pick';

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
import { KindergartenWithInstructorDTO } from './dto/kindergarten_with_instructor_dto';
import { GetKindergartensQuery } from '../kindergartens/domain/queries/impl/get_kindergartens_query';
import { Kindergarten } from '../kindergartens/domain/models/kindergarten_model';
import { GetUsersQuery } from '../users/domain/queries/impl/get_users_query';
import { User } from '@app/users/domain/models';
import { KindergartenMapper } from '../kindergartens/domain/mappers/kindergarten_mapper';
import { UserMapper } from '../users/domain/mappers/user_mapper';

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
  @UseGuards(new GqlAuthGuard({ role: ['admin', 'instructor'] }))
  async createAssessment(
    @Args('assessment') assessment: AssessmentInput,
  ): Promise<AssessmentCore> {
    const created: Assessment = await this.commandBus.execute(
      new CreateAssessmentCommand(assessment),
    );

    return AssessmentMapper.toPlain(created);
  }

  @Mutation(() => AssessmentDTO)
  @UseGuards(new GqlAuthGuard({ role: ['admin', 'instructor'] }))
  async updateAssessment(
    @CurrentUser() user: LoggedUser,
    @Args('id') id: string,
    @Args('assessment') assessment: UpdatedAssessmentInput,
  ): Promise<AssessmentCore> {
    const updated: Assessment = await this.commandBus.execute(
      new UpdateAssessmentCommand(
        id,
        user.role === 'instructor' ? pick(assessment, ['groups']) : assessment,
      ),
    );

    return AssessmentMapper.toPlain(updated);
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

    return assessments.map(a => AssessmentMapper.toPlain(a));
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

    return AssessmentMapper.toPlain(assessment);
  }

  @ResolveField(() => KindergartenWithInstructorDTO)
  async kindergartens(
    @Parent() assessment: AssessmentDTO,
    @Args('page', { nullable: true, type: () => Int }) page: number | undefined,
    @Args('searchPhrase', { nullable: true }) searchPhrase: string | undefined,
  ) {
    const allKindergartens: Kindergarten[] = await this.queryBus.execute(
      new GetKindergartensQuery(
        assessment.kindergartens.map(k => k.kindergartenId),
      ),
    );

    const filteredKindergartens = searchPhrase
      ? allKindergartens
          .filter(k =>
            k.name.toLowerCase().includes(searchPhrase.toLowerCase()),
          )
          .map(k => k.id)
      : allKindergartens.map(k => k.id);

    const paginatedKindergartens =
      page !== undefined
        ? assessment.kindergartens
            .filter(k => filteredKindergartens.includes(k.kindergartenId))
            .slice(page * 10, (page + 1) * 10)
        : assessment.kindergartens.filter(k =>
            filteredKindergartens.includes(k.kindergartenId),
          );

    const kindergartens: Kindergarten[] = await this.queryBus.execute(
      new GetKindergartensQuery(
        paginatedKindergartens.map(k => k.kindergartenId),
      ),
    );

    const instructors: User[] = await this.queryBus.execute(
      new GetUsersQuery(paginatedKindergartens.map(k => k.instructorId)),
    );

    return paginatedKindergartens.map(col => {
      const kindergarten = kindergartens.find(k => k.id === col.kindergartenId);
      const instructor = instructors.find(i => i.id === col.instructorId);

      return {
        kindergarten: kindergarten
          ? KindergartenMapper.toPlain(kindergarten)
          : null,
        instructor: instructor ? UserMapper.toPlain(instructor) : null,
      };
    });
  }
}
