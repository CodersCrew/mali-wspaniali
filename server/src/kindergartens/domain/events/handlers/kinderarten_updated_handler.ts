import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { KindergartenUpdatedEvent } from '../impl';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';

@EventsHandler(KindergartenUpdatedEvent)
export class KindergartenUpdatedHandler
  implements IEventHandler<KindergartenUpdatedEvent> {
  constructor(
    private readonly kindergartenRepository: KindergartenRepository,
  ) {}

  async handle({ id, updates }: KindergartenUpdatedEvent): Promise<void> {
    await this.kindergartenRepository.update(id, updates);
  }
}
