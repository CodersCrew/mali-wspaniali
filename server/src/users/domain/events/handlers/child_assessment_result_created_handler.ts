import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChildAssessmentResultCreatedEvent } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';

@EventsHandler(ChildAssessmentResultCreatedEvent)
export class ChildAssessmentResultCreatedHandler
  implements IEventHandler<ChildAssessmentResultCreatedEvent> {
  constructor(
    private readonly resultRepository: ChildAssessmentResultRepository,
  ) {}

  async handle({ result }: ChildAssessmentResultCreatedEvent): Promise<void> {
    await this.resultRepository.create(result);
  }
}
