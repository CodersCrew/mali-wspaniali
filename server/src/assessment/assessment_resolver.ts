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
import {
  AssessmentInput,
  UpdatedAssessmentInput,
} from './inputs/assessment_input';
import { AssessmentDTO } from './dto/assessment_dto';
import { GetAllAssessmentsQuery } from './domain/queries/impl/get_all_assessments_query';
import { KindergartenWithInstructorDTO } from './dto/kindergarten_with_instructor_dto';
import { Assessment, AssessmentDto } from './domain/models/assessment_model';
import { GetUsersQuery } from '../users/domain/queries/impl/get_users_query';
import { Kindergarten } from '../kindergartens/domain/models/kindergarten_model';
import { UserProps } from '../users/domain/models/user_model';
import { GetKindergartensQuery } from '../kindergartens/domain/queries/impl/get_kindergartens_query';
import { KindergartenMapper } from '../kindergartens/domain/mappers/kindergarten_mapper';
import { EditAssessmentCommand } from './domain/commands/impl/edit_assessment_command';
import { KindergartenWithInstructorProps } from './domain/models/kindergarten_with_instructor_value_object';
import { AssessmentMapper } from './domain/mappers/assessment_mapper';

@UseInterceptors(SentryInterceptor)
@Resolver(() => AssessmentDTO)
export class AssessmentResolver {
  constructor(private commandBus: CommandBus, private queryBus: QueryBus) {}

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async createAssessment(
    @Args('assessment') assessment: AssessmentInput,
  ): Promise<ReturnedStatusDTO> {
    const created: boolean = await this.commandBus.execute(
      new CreateAssessmentCommand(assessment),
    );

    return { status: !!created };
  }

  @Mutation(() => ReturnedStatusDTO)
  @UseGuards(new GqlAuthGuard({ role: 'admin' }))
  async updateAssessment(
    @Args('id') id: string,
    @Args('assessment') assessment: UpdatedAssessmentInput,
  ): Promise<ReturnedStatusDTO> {
    const updated: boolean = await this.commandBus.execute(
      new EditAssessmentCommand(id, assessment),
    );

    return { status: !!updated };
  }

  @Query(() => [AssessmentDTO])
  @UseGuards(GqlAuthGuard)
  async assessments(): Promise<AssessmentDto[]> {
    const assessments: Assessment[] = await this.queryBus.execute(
      new GetAllAssessmentsQuery(),
    );

    const rawAssessments = assessments.map(a => AssessmentMapper.toPersist(a));

    return rawAssessments;
  }

  @ResolveField(() => KindergartenWithInstructorDTO)
  async kindergartens(
    @Root() assessment: AssessmentDto,
  ): Promise<KindergartenWithInstructorDTO[]> {
    const kindergartenIds = assessment.kindergartens.map(k => k.kindergartenId);
    const instructorIds = assessment.kindergartens
      .map(k => k.instructorId)
      .filter(k => k);
    const kindergartens: Kindergarten[] = await this.getKindergartens(
      kindergartenIds,
    );
    const instructors: UserProps[] = await this.getInstructors(instructorIds);

    return assessment.kindergartens
      .map(assessmentKindergarten =>
        this.mapKindergartenWithInstructor(
          assessmentKindergarten as any,
          kindergartens,
          instructors,
        ),
      )
      .filter(k => k.kindergarten);
  }

  private getKindergartens(ids: string[]): Promise<Kindergarten[]> {
    return this.queryBus.execute(new GetKindergartensQuery(ids));
  }

  private getInstructors(ids: string[]): Promise<UserProps[]> {
    return this.queryBus.execute(new GetUsersQuery(ids));
  }

  private mapKindergartenWithInstructor(
    assessmentKindergarten: KindergartenWithInstructorProps,
    kindergartens: Kindergarten[],
    instructors: UserProps[],
  ) {
    const foundKindergarten = kindergartens.find(k => {
      return (
        k.id.toString() === assessmentKindergarten.kindergartenId.toString()
      );
    });

    const foundInstructor = instructors.find(i => {
      return (
        i._id.toString() === assessmentKindergarten.instructorId.toString()
      );
    });

    return {
      kindergarten: foundKindergarten
        ? KindergartenMapper.toRaw(foundKindergarten)
        : null,
      instructor: foundInstructor,
    };
  }
}
