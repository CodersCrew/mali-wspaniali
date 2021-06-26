import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';
import { GetAllAssessmentsAssignedToInstructorQuery } from '../impl';

@QueryHandler(GetAllAssessmentsAssignedToInstructorQuery)
export class GetAllAssessmentAssignedToInstructorHandler
  implements IQueryHandler<GetAllAssessmentsAssignedToInstructorQuery> {
  constructor(private repository: AssessmentRepository) {}

  async execute({
    instructorId,
  }: GetAllAssessmentsAssignedToInstructorQuery): Promise<Assessment[]> {
    return this.repository.getAllAssignedToInstructor(instructorId);
  }
}
