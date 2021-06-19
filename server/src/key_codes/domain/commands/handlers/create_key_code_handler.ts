import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ShortUniqueId from 'short-unique-id';

import { CreateKeyCodeCommand } from '../impl/create_key_code_command';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCodeMapper } from '../../mappers/keycode_mapper';
import { KeyCode } from '../../models/key_code_model';

const uuid = new ShortUniqueId();

@CommandHandler(CreateKeyCodeCommand)
export class CreateKeyCodeHandler
  implements ICommandHandler<CreateKeyCodeCommand> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(command: CreateKeyCodeCommand): Promise<KeyCode> {
    const { createdBy, target } = command;

    const keyCode = KeyCodeMapper.toDomain({
      createdBy,
      target,
    });

    return await this.repository.create(keyCode);
  }
}
