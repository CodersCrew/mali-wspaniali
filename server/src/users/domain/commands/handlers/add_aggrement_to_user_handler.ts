import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UserRepository } from '../../repositories/user_repository';
import { AddAggrementToUserCommand } from '../impl/add_aggrement_to_user_command';
import { AggrementRepository } from '../../../../agreements/domain/repositories/aggrement_repository';
import { AggrementProps } from '../../../../agreements/schemas/aggrement_schema';

@CommandHandler(AddAggrementToUserCommand)
export class AddAggrementToUserHandler
  implements ICommandHandler<AddAggrementToUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly aggrementRepository: AggrementRepository,
  ) {}

  async execute({
    aggrementId,
    userId,
  }: AddAggrementToUserCommand): Promise<AggrementProps> {
    const foundAggrement = await this.aggrementRepository.get(aggrementId);

    if (foundAggrement) {
      await this.userRepository.addAgreement(userId, aggrementId);

      return foundAggrement;
    }

    throw new Error('Adding a child failed.');
  }
}
