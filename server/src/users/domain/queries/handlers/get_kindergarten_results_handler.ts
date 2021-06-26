import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetKindergartenResults } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';

@QueryHandler(GetKindergartenResults)
export class GetKindergartenResultsHandler
  implements IQueryHandler<GetKindergartenResults> {
  constructor(private resultRepository: ChildAssessmentResultRepository) {}

  async execute({
    kindergartenId,
    assessmentId,
  }: GetKindergartenResults): Promise<PartialChildResult[]> {
    return await this.resultRepository.getByKindergarten(
      kindergartenId,
      assessmentId,
    );
  }
}
