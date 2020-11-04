import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { Child } from '../../models/child_model';
import { isObjectId } from '../../../../shared/utils/db_utils';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';
import { EditChildCommand } from '../impl/edit_child_command';

@CommandHandler(EditChildCommand)
export class EditChildHandler implements ICommandHandler<EditChildCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
    private readonly kindergartenRepository: KindergartenRepository,
  ) {}

  async execute(command: EditChildCommand): Promise<Child> {
    const {
      child: { kindergartenId, childId, ...rawChild },
      userId,
    } = command;

    if (!isObjectId(kindergartenId)) {
      throw new Error('Kindergarten not found');
    }

    const kindergarten = await this.kindergartenRepository.get(kindergartenId);

    if (!kindergarten) {
      throw new Error('Kindergarten not found');
    }

    if (!isObjectId(userId)) {
      throw new Error('Parent not found');
    }

    const parent = await this.userRepository.get(userId);

    if (!parent) {
      throw new Error('Parent not found');
    }

    const updatedChild = await this.childRepository.updateChild(childId, {
      kindergarten: kindergartenId,
      ...rawChild,
    });

    if (updatedChild) return updatedChild;

    throw new Error('Editing a child failed.');
  }
}
