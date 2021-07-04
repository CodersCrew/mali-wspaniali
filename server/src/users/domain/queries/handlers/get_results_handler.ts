import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';
import { GetResultsQuery } from '../impl';

@QueryHandler(GetResultsQuery)
export class GetResultsHandler implements IQueryHandler<GetResultsQuery> {
  constructor(private resultRepository: ChildAssessmentResultRepository) {}

  async execute({
    assessmentId,
  }: GetResultsQuery): Promise<PartialChildResult[]> {
    return await this.resultRepository.getByAssessment(assessmentId);
  }
}
