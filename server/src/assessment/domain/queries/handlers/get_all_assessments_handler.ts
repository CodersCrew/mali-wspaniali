import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllAssessmentsQuery } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { AssessmentInput } from '../../models/assessment_model';

@QueryHandler(GetAllAssessmentsQuery)
export class GetAllAssessmentHandler
  implements IQueryHandler<GetAllAssessmentsQuery> {
  constructor(private readonly repository: AssessmentRepository) {}

  async execute(): Promise<AssessmentInput[]> {
    return this.repository.getAll();
  }
}
