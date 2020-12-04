import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetAssessmentsQuery } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';

@QueryHandler(GetAssessmentsQuery)
export class GetAssessmentHandler
  implements IQueryHandler<GetAssessmentsQuery> {
  constructor(private readonly repository: AssessmentRepository) {}

  async execute({ id }: GetAssessmentsQuery): Promise<Assessment> {
    return this.repository.get(id);
  }
}
