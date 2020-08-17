import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAgreementCommand } from '../impl/create_agreement_command';
import { AgreementProps } from '../../../schemas/agreement_schema';
import { AgreementRepository } from '../../repositories/agreement_repository';

@CommandHandler(CreateAgreementCommand)
export class CreateAgreementHandler
  implements ICommandHandler<CreateAgreementCommand> {
  constructor(private readonly repository: AgreementRepository) {}

  async execute(command: CreateAgreementCommand): Promise<AgreementProps> {
    const { agreement } = command;

    return await this.repository.create(agreement);
  }
}
