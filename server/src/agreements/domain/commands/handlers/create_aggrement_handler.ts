import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateAggrementCommand } from '../impl/create_aggrement_command';
import { AggrementProps } from '../../../schemas/aggrement_schema';
import { AggrementRepository } from '../../repositories/aggrement_repository';

@CommandHandler(CreateAggrementCommand)
export class CreateAggrementHandler
  implements ICommandHandler<CreateAggrementCommand> {
  constructor(private readonly repository: AggrementRepository) {}

  async execute(command: CreateAggrementCommand): Promise<AggrementProps> {
    const { aggrement } = command;

    return await this.repository.create(aggrement);
  }
}
