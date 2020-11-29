import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { EditAssessmentCommand } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';
import { AssessmentMapper } from '../../mappers/assessment_mapper';

@CommandHandler(EditAssessmentCommand)
export class EditAssessmentHandler
  implements ICommandHandler<EditAssessmentCommand> {
  constructor(private readonly repository: AssessmentRepository) {}

  async execute({
    id,
    assessment: updatedAssessment,
  }: EditAssessmentCommand): Promise<boolean> {
    const assessment = await this.repository.get(id);

    assessment.update(AssessmentMapper.toUpdated(updatedAssessment));

    const result = await this.repository.update(assessment);

    return result;
  }
}
