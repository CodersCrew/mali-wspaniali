import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { CreateKindergartenCommand } from '../impl/create_kindergarten_command';
import { KindergartenRepository } from '../../repositories/kindergarten_repository';
import { KindergartenMapper } from '../../mappers/kindergarten_mapper';
import { Kindergarten } from '../../models/kindergarten_model';

@CommandHandler(CreateKindergartenCommand)
export class CreateKindergartenHandler
  implements ICommandHandler<CreateKindergartenCommand> {
  constructor(
    private readonly repository: KindergartenRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateKindergartenCommand): Promise<Kindergarten> {
    const { kindergarten } = command;

    const createdKindergarten = KindergartenMapper.toDomainFrom(kindergarten);

    const created = this.publisher.mergeObjectContext(
      await this.repository.create(createdKindergarten),
    );

    await created.commit();

    return created;
  }
}
