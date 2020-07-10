import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserCreatedEvent } from '../impl/article_created_event';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_code_repository';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(private readonly keyCodeRepository: KeyCodeRepository) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { keyCode } = event;

    await this.keyCodeRepository.removeKeyCode(keyCode);
  }
}
