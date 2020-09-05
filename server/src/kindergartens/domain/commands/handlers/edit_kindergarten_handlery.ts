import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenProps } from '../../models/kindergarten_model';
import { EditKindergartenCommand } from '../impl';

@CommandHandler(EditKindergartenCommand)
export class EditKindergartenHandler
  implements ICommandHandler<EditKindergartenCommand> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(command: EditKindergartenCommand): Promise<KindergartenProps> {
    const { id, kindergarten } = command;

    const created = await this.repository.update(id, kindergarten);

    return created;
  }
}
