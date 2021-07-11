import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';
import { PartialChildResult } from '../../../inputs/child_result_input';
import { GetResultByIdQuery } from '../impl';

@QueryHandler(GetResultByIdQuery)
export class GetResultByIdHandler implements IQueryHandler<GetResultByIdQuery> {
  constructor(private resultRepository: ChildAssessmentResultRepository) {}

  execute({ resultId }: GetResultByIdQuery): Promise<PartialChildResult> {
    return this.resultRepository.get(resultId);
  }
}
