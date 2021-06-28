import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAgreementCommand } from '../impl/create_agreement_command';
import { AgreementRepository } from '../../repositories/agreement_repository';
import { Agreement } from '../../models/agreement';

@CommandHandler(CreateAgreementCommand)
export class CreateAgreementHandler
  implements ICommandHandler<CreateAgreementCommand> {
  constructor(private repository: AgreementRepository) {}

  async execute(command: CreateAgreementCommand): Promise<Agreement> {
    const { agreement } = command;

    return await this.repository.create(agreement);
  }
}
