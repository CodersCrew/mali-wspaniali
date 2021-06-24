import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';
import { GetChildResultsQuery } from '../impl';

@QueryHandler(GetChildResultsQuery)
export class GetChildResultHandler
  implements IQueryHandler<GetChildResultsQuery> {
  constructor(private resultRepository: ChildAssessmentResultRepository) {}

  async execute({
    childId,
  }: GetChildResultsQuery): Promise<PartialChildResult[]> {
    return await this.resultRepository.getByChild(childId);
  }
}
