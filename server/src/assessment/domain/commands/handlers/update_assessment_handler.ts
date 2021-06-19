import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateAssessmentCommand } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';

@CommandHandler(UpdateAssessmentCommand)
export class UpdateAssessmentHandler
  implements ICommandHandler<UpdateAssessmentCommand> {
  constructor(private repository: AssessmentRepository) {}

  async execute({
    id,
    assessment: updatedAssessment,
  }: UpdateAssessmentCommand): Promise<Assessment> {
    const assessment = await this.repository.get(id);

    assessment.update(updatedAssessment);

    const result = await this.repository.update(assessment);

    return result;
  }
}
