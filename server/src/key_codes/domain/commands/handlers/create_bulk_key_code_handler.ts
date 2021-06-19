import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ShortUniqueId from 'short-unique-id';

import { CreateBulkKeyCodeCommand } from '../impl';
import { KeyCodeRepository } from '../../repositories/key_codes_repository';
import { KeyCodeMapper } from '../../mappers/keycode_mapper';
import { KeyCode } from '../../models/key_code_model';

const uuid = new ShortUniqueId();

@CommandHandler(CreateBulkKeyCodeCommand)
export class CreateBulkKeyCodeHandler
  implements ICommandHandler<CreateBulkKeyCodeCommand> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(command: CreateBulkKeyCodeCommand): Promise<KeyCode[]> {
    const { createdBy, amount, target } = command;

    const series = uuid.randomUUID(10);

    const keyCodes = new Array(amount)
      .fill(null)
      .map(() => KeyCodeMapper.toDomain({ createdBy, target, series }));

    return await this.repository.createBulk(keyCodes);
  }
}
