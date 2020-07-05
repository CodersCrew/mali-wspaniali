import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { CreateKeyCodeCommand } from '../impl/create_key_code_command';
import { KeyCodeRepository } from '../../repositories/key_code_repository';
import { KeyCodeProps } from '../../models/key_code_model';

@CommandHandler(CreateKeyCodeCommand)
export class CreateKeyCodeHandler
  implements ICommandHandler<CreateKeyCodeCommand> {
  constructor(private readonly repository: KeyCodeRepository) {}

  async execute(command: CreateKeyCodeCommand): Promise<KeyCodeProps> {
    const { createdBy } = command;

    const keyCode = uuid.v4();

    const created = await this.repository.create({ createdBy, keyCode });

    return created;
  }
}
