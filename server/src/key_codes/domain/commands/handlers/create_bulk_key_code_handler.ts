import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import ShortUniqueId from 'short-unique-id';

import { CreateBulkKeyCodeCommand } from '../impl/create_bulk_key_code_command';
import { KeyCodeRepository } from '../../repositories/key_code_repository';
import { KeyCodeProps } from '../../models/key_code_model';

const uuid = new ShortUniqueId();

@CommandHandler(CreateBulkKeyCodeCommand)
export class CreateBulkKeyCodeHandler
  implements ICommandHandler<CreateBulkKeyCodeCommand> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(command: CreateBulkKeyCodeCommand): Promise<KeyCodeProps[]> {
    const { createdBy, amount } = command;

    const keyCodes = new Array(amount)
      .fill(null)
      .map(() => ({ createdBy, keyCode: uuid.randomUUID(10) }));

    const created = await this.repository.createBulk(keyCodes);

    return created;
  }
}
