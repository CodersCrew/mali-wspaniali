import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { UserSignedAgreementEvent } from '../impl';
import { UserRepository } from '../../repositories/user_repository';

@EventsHandler(UserSignedAgreementEvent)
export class UserSignedAgreementHandler
  implements IEventHandler<UserSignedAgreementEvent> {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(event: UserSignedAgreementEvent): Promise<void> {
    const { agreementId, userId } = event;

    this.userRepository.addAgreement(userId, agreementId);
  }
}
