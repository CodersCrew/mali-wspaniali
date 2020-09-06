import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { AddChildCommand } from '../impl/add_child_command';
import { UserRepository } from '../../repositories/user_repository';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildDocument } from '../../../schemas/child_schema';

@CommandHandler(AddChildCommand)
export class AddChildHandler implements ICommandHandler<AddChildCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
  ) {}

  async execute(command: AddChildCommand): Promise<ChildDocument> {
    const {
      child: { kindergartenId, ...rawChild },
      userId,
    } = command;

    const createdChild = await this.childRepository.create({
      ...rawChild,
      kindergarten: new mongoose.Types.ObjectId(kindergartenId),
    });

    if (createdChild) {
      this.userRepository.addChild(createdChild._id.toString(), userId);

      return createdChild;
    }

    throw new Error('Adding a child failed.');
  }
}
