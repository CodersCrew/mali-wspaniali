import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { UserUnsignedAgreementEvent } from '../impl';

@EventsHandler(UserUnsignedAgreementEvent)
export class UserUnsignedAgreementHandler
  implements IEventHandler<UserUnsignedAgreementEvent> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: UserUnsignedAgreementEvent): Promise<void> {
    const { agreementId, userId } = event;

    this.userRepository.removeAgreement(userId, agreementId);
  }
}
