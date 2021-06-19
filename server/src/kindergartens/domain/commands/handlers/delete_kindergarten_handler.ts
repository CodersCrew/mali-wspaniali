import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { DeleteKindergartenCommand } from '../impl';
import { ChildRepository } from '../../../../users/domain/repositories/child_repository';

@CommandHandler(DeleteKindergartenCommand)
export class DeleteKindergartenHandler
  implements ICommandHandler<DeleteKindergartenCommand> {
  constructor(
    private repository: KindergartenRepository,
    private childRepository: ChildRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: DeleteKindergartenCommand): Promise<void> {
    const { id } = command;

    const foundChildren = await this.childRepository.getByKindergarten(id);

    if (foundChildren.length > 0) {
      throw new Error('KINDERGARTEN_NOT_EMPTY');
    } else {
      const kindergarten = this.publisher.mergeObjectContext(
        await this.repository.get(id),
      );

      await kindergarten.delete();

      await kindergarten.commit();
    }
  }
}
