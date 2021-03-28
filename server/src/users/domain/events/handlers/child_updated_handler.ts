import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { ChildUpdatedEvent } from '../impl';
import { ChildRepository } from '../../repositories/child_repository';

@EventsHandler(ChildUpdatedEvent)
export class ChildUpdatedHandler implements IEventHandler<ChildUpdatedEvent> {
  constructor(private readonly childRepository: ChildRepository) {}

  async handle({ childId, update }: ChildUpdatedEvent): Promise<void> {
    this.childRepository.updateChild(childId, update);
  }
}
