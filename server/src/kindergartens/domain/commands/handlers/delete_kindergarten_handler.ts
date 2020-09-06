import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { DeleteKindergartenCommand } from '../impl';
import { ChildRepository } from '../../../../users/domain/repositories/child_repository';

@CommandHandler(DeleteKindergartenCommand)
export class DeleteKindergartenHandler
  implements ICommandHandler<DeleteKindergartenCommand> {
  constructor(
    private readonly repository: KindergartenRepository,
    private readonly childRepository: ChildRepository,
  ) {}

  async execute(command: DeleteKindergartenCommand): Promise<boolean> {
    const { id } = command;

    const foundChildren = await this.childRepository.getByKindergarten(id);

    if (foundChildren.length > 0) {
      throw new Error('KINDERGARTEN_NOT_EMPTY');
    } else {
      return !!(await this.repository.removeKindergarten(id));
    }
  }
}
