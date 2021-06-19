import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChildAssessmentResultUpdatedEvent } from '../impl';
import { ChildAssessmentResultRepository } from '../../repositories/child_assessment_result_repository';

@EventsHandler(ChildAssessmentResultUpdatedEvent)
export class ChildAssessmentResultUpdatedHandler
  implements IEventHandler<ChildAssessmentResultUpdatedEvent> {
  constructor(
    private readonly resultRepository: ChildAssessmentResultRepository,
  ) {}

  async handle({ result }: ChildAssessmentResultUpdatedEvent): Promise<void> {
    await this.resultRepository.update(result);
  }
}
