import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { Kindergarten } from '../../models/kindergarten_model';
import { EditKindergartenCommand } from '../impl';

@CommandHandler(EditKindergartenCommand)
export class EditKindergartenHandler
  implements ICommandHandler<EditKindergartenCommand> {
  constructor(private repository: KindergartenRepository) {}

  async execute(command: EditKindergartenCommand): Promise<Kindergarten> {
    const { id, kindergarten } = command;

    return await this.repository.update(id, kindergarten);
  }
}
