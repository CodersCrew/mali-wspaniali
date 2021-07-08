import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetKindergartenResultsQuery } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';

@QueryHandler(GetKindergartenResultsQuery)
export class GetKindergartenResultsHandler
  implements IQueryHandler<GetKindergartenResultsQuery> {
  constructor(private resultRepository: ChildAssessmentResultRepository) {}

  async execute({
    kindergartenId,
    assessmentId,
  }: GetKindergartenResultsQuery): Promise<PartialChildResult[]> {
    return await this.resultRepository.getByKindergarten(
      kindergartenId,
      assessmentId,
    );
  }
}
