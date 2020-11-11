import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateAssessmentCommand } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment } from '../../models/assessment_model';

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
    const assessment = this.publisher.mergeObjectContext(
      await this.repository.create(newAssessment),
    );

    assessment.commit();

    return assessment;
  }
}
