import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { ChangeUserAgreementCommand } from '../impl/change_user_agreement_command';
import { AgreementRepository } from '../../../../agreements/domain/repositories/agreement_repository';
import { AgreementProps } from '../../../../agreements/schemas/agreement_schema';

@CommandHandler(ChangeUserAgreementCommand)
export class ChangeUserAgreementHandler
  implements ICommandHandler<ChangeUserAgreementCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly agreementRepository: AgreementRepository,
  ) {}

  async execute({
    agreementId,
    userId,
  }: ChangeUserAgreementCommand): Promise<AgreementProps> {
    const foundAgreement = await this.agreementRepository.get(agreementId);
    const foundUser = await this.userRepository.get(userId);

    if (foundAgreement && foundUser) {
      if (
        (foundUser.agreements as any).find(a => {
          return a.toString() === agreementId;
        })
      ) {
        await this.userRepository.removeAgreement(userId, agreementId);
      } else {
        await this.userRepository.addAgreement(userId, agreementId);
      }

      return foundAgreement;
    }

    throw new Error('Changing agreement failed.');
  }
}
