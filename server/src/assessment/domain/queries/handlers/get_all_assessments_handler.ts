import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAllAssessmentsQuery } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';

@QueryHandler(GetAllAssessmentsQuery)
export class GetAllAssessmentHandler
  implements IQueryHandler<GetAllAssessmentsQuery> {
  constructor(private repository: AssessmentRepository) {}

  async execute(): Promise<Assessment[]> {
    return this.repository.getAll();
  }
}
