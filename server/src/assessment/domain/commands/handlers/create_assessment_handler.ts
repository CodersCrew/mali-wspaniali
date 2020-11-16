import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateAssessmentCommand } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';
import { AssessmentMapper } from '../../mappers/assessment_mapper';

@CommandHandler(CreateAssessmentCommand)
export class CreateAssessmentHandler
  implements ICommandHandler<CreateAssessmentCommand> {
  constructor(
    private readonly repository: AssessmentRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({
    assessment: newAssessment,
  }: CreateAssessmentCommand): Promise<Assessment> {
    const assessment = AssessmentMapper.inputToDomain(newAssessment);
    const createdAssessment = this.publisher.mergeObjectContext(
      await this.repository.create(assessment),
    );

    createdAssessment.commit();

    return createdAssessment;
  }
}
