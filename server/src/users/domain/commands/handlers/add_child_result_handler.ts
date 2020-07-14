import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AddChildResultCommand } from '../impl/add_child_result_command';
import { ChildResultDocument } from '../../../schemas/child_result_schema';
import { ChildResultRepository } from '../../repositories/child_result_repository';
import { ChildRepository } from '../../repositories/child_repository';

@CommandHandler(AddChildResultCommand)
export class AddChildResultHandler
  implements ICommandHandler<AddChildResultCommand> {
  constructor(
    private readonly childResultRepository: ChildResultRepository,
    private readonly childRepository: ChildRepository,
  ) {}

  async execute(command: AddChildResultCommand): Promise<ChildResultDocument> {
    const { childId, result } = command;

    const childResult = { test: result, childId };

    const createdResult = await this.childResultRepository.create(childResult);

    await this.childRepository.addResult(childId, createdResult._id);

    return createdResult;
  }
}
