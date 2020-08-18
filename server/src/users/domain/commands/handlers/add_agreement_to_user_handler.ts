import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { AddAgreementToUserCommand } from '../impl/add_agreement_to_user_command';
import { AgreementRepository } from '../../../../agreements/domain/repositories/agreement_repository';
import { AgreementProps } from '../../../../agreements/schemas/agreement_schema';

@CommandHandler(AddAgreementToUserCommand)
export class AddAgreementToUserHandler
  implements ICommandHandler<AddAgreementToUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly agreementRepository: AgreementRepository,
  ) {}

  async execute({
    agreementId,
    userId,
  }: AddAgreementToUserCommand): Promise<AgreementProps> {
    const foundAgreement = await this.agreementRepository.get(agreementId);

    if (foundAgreement) {
      await this.userRepository.addAgreement(userId, agreementId);

      return foundAgreement;
    }

    throw new Error('Adding a child failed.');
  }
}
