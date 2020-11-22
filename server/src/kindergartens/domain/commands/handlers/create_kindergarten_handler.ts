import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateKindergartenCommand } from '../impl/create_kindergarten_command';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenMapper } from '../../mappers/kindergarten_mapper';
import { Kindergarten } from '../../models/kindergarten_model';

@CommandHandler(CreateKindergartenCommand)
export class CreateKindergartenHandler
  implements ICommandHandler<CreateKindergartenCommand> {
  constructor(private readonly repository: KindergartenRepository) {}

  async execute(command: CreateKindergartenCommand): Promise<Kindergarten> {
    const { kindergarten } = command;

    const createdKindergarten = KindergartenMapper.toDomainFrom(kindergarten, {
      isNew: true,
    });

    const created = await this.repository.create(createdKindergarten);

    return created;
  }
}
