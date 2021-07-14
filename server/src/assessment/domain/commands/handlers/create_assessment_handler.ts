import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateAssessmentCommand } from '../impl';
import { AssessmentRepository } from '../../repositories/assessment_repository';
import { Assessment, AssessmentCore } from '../../models/assessment_model';
import { AssessmentMapper } from '../../mappers/assessment_mapper';

@CommandHandler(CreateAssessmentCommand)
export class CreateAssessmentHandler
  implements ICommandHandler<CreateAssessmentCommand> {
  constructor(
    private repository: AssessmentRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    assessment: newAssessment,
  }: CreateAssessmentCommand): Promise<Assessment> {
    const mappedKindergartesInst = newAssessment.kindergartenIds.map(k => ({
      kindergartenId: k,
      instructorId: null,
    }));
    const assessment = AssessmentMapper.toDomain(({
      ...newAssessment,
      kindergartens: mappedKindergartesInst,
    } as unknown) as AssessmentCore);

    const createdAssessment = this.publisher.mergeObjectContext(
      await this.repository.create(assessment),
    );

    createdAssessment.commit();

    return createdAssessment;
  }
}
