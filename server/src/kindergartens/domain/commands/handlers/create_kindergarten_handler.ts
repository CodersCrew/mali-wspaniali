import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateKindergartenCommand } from '../impl/create_kindergarten_command';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenProps } from '../../../../kindergartens/domain/models/kindergarten_model';

@CommandHandler(CreateKindergartenCommand)
export class CreateKindergartenHandler
  implements ICommandHandler<CreateKindergartenCommand> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(
    command: CreateKindergartenCommand,
  ): Promise<KindergartenProps> {
    const { kindergarten } = command;

    const created = await this.repository.create(kindergarten);

    return created;
  }
}
