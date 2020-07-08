import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as uuid from 'uuid';

import { CreateUserCommand } from '../impl/create_user_command';
import { UserProps } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_code_repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly keyCodeRepository: KeyCodeRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<UserProps | null> {
    const { mail, password, keyCode } = command;

    const existedKeyCode = await this.keyCodeRepository.isKeyCode(keyCode);
    const existedMail = await this.userRepository.getByMail(mail);

    if (existedKeyCode && !existedMail) {
      const created = await this.userRepository.create({ mail, password });
      await this.keyCodeRepository.removeKeyCode(keyCode); // move to event

      return created;
    }

    return null;
  }
}
