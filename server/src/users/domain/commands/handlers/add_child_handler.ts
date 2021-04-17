import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';

import { AddChildCommand } from '../impl/add_child_command';
import { UserRepository } from '../../repositories/user_repository';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildMapper } from '../../mappers/child_mapper';
import { Child } from '../../models/child_model';
import { isObjectId } from '../../../../shared/utils/db_utils';
import { KindergartenRepository } from '../../../../kindergartens/domain/repositories/kindergarten_repository';

@CommandHandler(AddChildCommand)
export class AddChildHandler implements ICommandHandler<AddChildCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
    private readonly kindergartenRepository: KindergartenRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddChildCommand): Promise<Child> {
    const {
      child: { kindergartenId, ...rawChild },
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

    const child = ChildMapper.toDomain({
      ...rawChild,
      _id: undefined,
      kindergarten: kindergartenId,
      isDeleted: false,
      results: [],
    });

    const createdChild = this.publisher.mergeObjectContext(
      await this.childRepository.create(child),
    );

    if (createdChild) {
      await this.userRepository.addChild(createdChild.id, userId);

      await createdChild.commit();

      return createdChild;
    }

    throw new Error('Adding a child failed.');
  }
}
