import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { ChangeUserAgreementCommand } from '../impl/change_user_agreement_command';
import { AgreementRepository } from '../../../../agreements/domain/repositories/agreement_repository';
import { AgreementMapper } from '../../../../agreements/domain/mappers/agreement_mapper';
import { Agreement } from '@app/agreements/domain/models/agreement';
import { User } from '@users/domain/models';

@CommandHandler(ChangeUserAgreementCommand)
export class ChangeUserAgreementHandler
  implements ICommandHandler<ChangeUserAgreementCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly agreementRepository: AgreementRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({
    agreementId,
    userId,
  }: ChangeUserAgreementCommand): Promise<Agreement> {
    const agreement = await this.agreementRepository.get(agreementId);
    const user = this.publisher.mergeObjectContext(
      await this.userRepository.get(userId),
    );

    if (agreement && user) {
      if (user.agreements.includes(agreementId)) {
        user.unsignAgreement(agreementId);
      } else {
        user.signAgreement(agreementId);
      }

      user.commit();

      const isSigned = user.hasAgreement(agreement.id);

      return AgreementMapper.toDomain({ ...agreement.getProps(), isSigned });
    }

    throw new Error('Changing agreement failed.');
  }
}
