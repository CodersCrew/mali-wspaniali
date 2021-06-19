import { UseInterceptors } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
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

@UseInterceptors(SentryInterceptor)
@Resolver(() => ChildAssessmentResultDTO)
export class ChildAssessmentResultResolver {
  constructor(private queryBus: QueryBus) {}

  @ResolveField(() => ChildCurrentParamsDTO)
  async currentParams(
    @Parent() result: ChildAssessmentResultDTO,
  ): Promise<ChildCurrentParamsDTO> {
    const [child] = await this.queryBus.execute(
      new GetChildrenQuery([result.childId]),
    );

    const assessment: Assessment = await this.queryBus.execute(
      new GetAssessmentsQuery(result.assessmentId),
    );

    return countParams(child, assessment.firstMeasurementStartDate);
  }

  @ResolveField(() => AssessmentDTO)
  async assessment(
    @Parent() result: ChildAssessmentResultDTO,
  ): Promise<AssessmentCore> {
    const fetchedResult = await this.queryBus.execute(
      new GetAssessmentsQuery(result.assessmentId),
    );

    return AssessmentMapper.toPersist(fetchedResult);
  }
}
