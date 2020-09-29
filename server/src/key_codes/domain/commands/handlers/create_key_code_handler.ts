import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ShortUniqueId from 'short-unique-id';

import { CreateKeyCodeCommand } from '../impl/create_key_code_command';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCodeProps } from '../../models/key_code_model';

const uuid = new ShortUniqueId();

@CommandHandler(CreateKeyCodeCommand)
export class CreateKeyCodeHandler
  implements ICommandHandler<CreateKeyCodeCommand> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(command: CreateKeyCodeCommand): Promise<KeyCodeProps> {
    const { createdBy, target } = command;

    const keyCode = uuid.randomUUID(10);

    const series = uuid.randomUUID(10);

    const created = await this.repository.create(
      { createdBy, keyCode },
      series,
      target,
    );

    return created;
  }
}
