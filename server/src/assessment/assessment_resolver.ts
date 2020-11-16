import {
  Resolver,
  Mutation,
  Query,
  Args,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { UseInterceptors, UseGuards } from '@nestjs/common';

import { SentryInterceptor } from '../shared/sentry_interceptor';
import { GqlAuthGuard } from '../users/guards/jwt_guard';
import { CreateAssessmentCommand } from './domain/commands/impl/create_assessment_command';
import { ReturnedStatusDTO } from '../shared/returned_status';
import { CreateAssessmentInput } from './inputs/create_assessment_input';
import { AssessmentDTO } from './dto/assessment_dto';
import { GetAllAssessmentsQuery } from './domain/queries/impl/get_all_assessments_query';
import { KindergartenWithInstructorDTO } from './dto/kindergarten_with_instructor_dto';
import { AssessmentDto } from './domain/models/assessment_model';
import { GetUsersQuery } from '../users/domain/queries/impl/get_users_query';
import { KindergartenProps } from '../kindergartens/domain/models/kindergarten_model';
import { UserProps } from '../users/domain/models/user_model';
import { GetKindergartensQuery } from '../kindergartens/domain/queries/impl/get_kindergartens_query';

@UseInterceptors(SentryInterceptor)
@Resolver(() => AssessmentDTO)
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

  @ResolveField(() => KindergartenWithInstructorDTO)
  async kindergartens(
    @Root() assessment: AssessmentDto,
  ): Promise<KindergartenWithInstructorDTO[]> {
    const kindergartenIds = assessment.kindergartens.map(k => k.kindergartenId);
    const instructorIds = assessment.kindergartens
      .map(k => k.instructorId)
      .filter(k => k);
    const kindergartens: KindergartenProps[] = await this.queryBus.execute(
      new GetKindergartensQuery(kindergartenIds),
    );
    const instructors: UserProps[] = await this.queryBus.execute(
      new GetUsersQuery(instructorIds),
    );

    return assessment.kindergartens
      .map(assessmentKindergarten => ({
        kindergarten: kindergartens.find(
          k =>
            k._id.toString() ===
            assessmentKindergarten.kindergartenId.toString(),
        ),
        instructor: instructors.find(
          i => i._id === assessmentKindergarten.instructorId,
        ),
      }))
      .filter(k => k.kindergarten);
  }
}
