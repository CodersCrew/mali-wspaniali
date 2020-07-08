import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { CreateUserCommand } from '../impl/create_user_command';
import { UserProps, User } from '../../models/user_model';
import { UserRepository } from '../../repositories/user_repository';
import { KeyCodeRepository } from '../../../../key_codes/domain/repositories/key_code_repository';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly keyCodeRepository: KeyCodeRepository,
  ) {}

  async execute(command: CreateUserCommand): Promise<User> {
    const { mail, password, keyCode } = command;

    const existedKeyCode = await this.keyCodeRepository.isKeyCode(keyCode);
    const existedMail = await this.userRepository.getByMail(mail);

    if (existedKeyCode && !existedMail) {
      const generatedSalt = await bcrypt.genSalt(10);
      const hashPasword = await bcrypt.hash(password, generatedSalt);

      const user = this.publisher.mergeObjectContext(
        await this.userRepository.create({ mail, password: hashPasword }),
      );
      return user;
    }

    throw new Error('Wrong KeyCode or email already exists.');
  }
}
