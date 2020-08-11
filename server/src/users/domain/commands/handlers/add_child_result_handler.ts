import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

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
    const { childId, result, rootResultId } = command;

    if (result.testPeriod !== 'START' && result.testPeriod !== 'END') {
      throw new Error('testPeriod can be only START or END');
    }

    if (result.testPeriod === 'START' && rootResultId) {
      throw new Error('Started tests cannot have root tests');
    }

    if (result.testPeriod === 'END' && !rootResultId) {
      throw new Error('Related tests must have root test');
    }

    if (result.testPeriod === 'END') {
      const foundResult = await this.childResultRepository.getByRootResult(
        rootResultId,
      );

      if (foundResult) {
        throw new Error('Adding result error');
      }

      const foundResultById = await this.childResultRepository.getById(
        rootResultId,
      );

      if (!foundResultById) {
        throw new Error('Adding result error2');
      }
    }

    const childResult = {
      test: result,
      childId,
      rootResultId,
    };

    const createdResult = await this.childResultRepository.create(childResult);

    await this.childRepository.addResult(childId, createdResult._id);

    return createdResult;
  }
}
