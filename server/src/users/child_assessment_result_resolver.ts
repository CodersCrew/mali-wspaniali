import { UseGuards, UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { SentryInterceptor } from '../shared/sentry_interceptor';
import { ChildAssessmentResultDTO } from './dto/child_assessment_result';
import { AssessmentDTO } from '../assessment/dto/assessment_dto';
import { GetAssessmentsQuery } from '../assessment/domain/queries/impl/get_assessment_query';
import { AssessmentMapper } from '../assessment/domain/mappers/assessment_mapper';
import {
  Assessment,
  AssessmentCore,
} from '../assessment/domain/models/assessment_model';
import { ChildCurrentParamsDTO } from './dto/child_current_params_dto';
import { GetChildrenQuery } from './domain/queries/impl/get_children_query';
import { countParams } from '../shared/utils/count_params';
import { ChildDTO } from './dto/child_dto';
import { GqlAuthGuard } from './guards/jwt_guard';
import { GetResultByIdQuery } from './domain/queries/impl/get_result_by_id_query';
import { ChildAssessmentResultMapper } from './domain/mappers/child_assessment_result_mapper';

@UseInterceptors(SentryInterceptor)
@Resolver(() => ChildAssessmentResultDTO)
export class ChildAssessmentResultResolver {
  constructor(private queryBus: QueryBus) {}

  @ResolveField(() => ChildCurrentParamsDTO, { nullable: true })
  async currentParams(
    @Parent() result: ChildAssessmentResultDTO,
  ): Promise<ChildCurrentParamsDTO> {
    const [child] = await this.queryBus.execute(
      new GetChildrenQuery([result.childId]),
    );

    const assessment: Assessment = await this.queryBus.execute(
      new GetAssessmentsQuery(result.assessmentId),
    );

    if (!assessment) return null;

    return countParams(child, assessment.firstMeasurementStartDate);
  }

  @ResolveField(() => ChildDTO, { nullable: true })
  async child(
    @Parent() result: ChildAssessmentResultDTO,
  ): Promise<ChildCurrentParamsDTO> {
    const [child] = await this.queryBus.execute(
      new GetChildrenQuery([result.childId]),
    );

    return child;
  }

  @ResolveField(() => AssessmentDTO, { nullable: true })
  async assessment(
    @Parent() result: ChildAssessmentResultDTO,
  ): Promise<AssessmentCore> {
    const fetchedAssessment = await this.queryBus.execute<
      GetAssessmentsQuery,
      Assessment | null
    >(new GetAssessmentsQuery(result.assessmentId));

    if (!fetchedAssessment) return null;

    return AssessmentMapper.toPlain(fetchedAssessment);
  }

  @Query(() => ChildAssessmentResultDTO)
  @UseGuards(GqlAuthGuard)
  async result(@Args('id') id: string) {
    const result = await this.queryBus.execute(new GetResultByIdQuery(id));

    return ChildAssessmentResultMapper.toPlain(result);
  }
}
