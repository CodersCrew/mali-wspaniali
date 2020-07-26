import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateKindergartenCommand } from '../impl/create_kindergarten_command';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenProps } from '../../models/kindergarten_model';

@CommandHandler(CreateKindergartenCommand)
export class CreateKindergartenHandler
  implements ICommandHandler<CreateKindergartenCommand> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(
    command: CreateKindergartenCommand,
  ): Promise<KindergartenProps> {
    const { kindergartenProps } = command;

    const createResult = this.repository.create(kindergartenProps);
    return createResult;
  }
}
