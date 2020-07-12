import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { AddChildCommand } from '../impl/add_child_command';
import { User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_code_repository';
import { ChildRepository } from '../../repositories/child_repository';
import { ChildDocument } from '../../../schemas/child_schema';

@CommandHandler(AddChildCommand)
export class AddChildHandler implements ICommandHandler<AddChildCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly childRepository: ChildRepository,
  ) {}

  async execute(command: AddChildCommand): Promise<ChildDocument> {
    const { child, userId } = command;

    const createdChild = await this.childRepository.create(child);

    if (createdChild) {
      this.userRepository.addChild(createdChild._id.toString(), userId);

      return createdChild;
    }

    throw new Error('Adding a child failed.');
  }
}
