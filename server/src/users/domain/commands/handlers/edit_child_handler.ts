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
  ) {
    this.getKindergarten = this.getKindergarten.bind(this);
  }

  async execute(command: EditChildCommand): Promise<Child> {
    const {
      child: { kindergartenId, childId, ...rawChild },
      userId,
    } = command;

    let kindergarten;

    if (command.child.kindergartenId) {
      kindergarten = await this.getKindergarten(command);
    }

    if (!isObjectId(userId)) {
      throw new Error('Parent not found');
    }

    const parent = await this.userRepository.get(userId);

    if (!parent) {
      throw new Error('Parent not found');
    }

    let updateQuery: Partial<EditChildCommand['child']> & {
      kindergarten?: string;
    } = rawChild;

    if (kindergarten) {
      updateQuery.kindergarten = kindergartenId;
    }

    const updatedChild = await this.childRepository.updateChild(
      childId,
      updateQuery,
    );

    if (updatedChild) return updatedChild;

    throw new Error('Editing a child failed.');
  }

  async getKindergarten({ child }: EditChildCommand) {
    if (child.kindergartenId && !isObjectId(child.kindergartenId)) {
      throw new Error('Kindergarten not found');
    }

    const kindergarten = await this.kindergartenRepository.get(
      child.kindergartenId,
    );

    if (!kindergarten) {
      throw new Error('Kindergarten not found');
    }

    return kindergarten;
  }
}
