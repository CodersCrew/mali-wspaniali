import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';

import { ChangePasswordCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { JwtService } from '@nestjs/jwt';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private userChangePasswordRepository: UserChangePasswordRepository,
  ) {}

  async execute(command: ChangePasswordCommand): Promise<void> {
    const { jwt, password } = command;

    const parsed = this.jwtService.decode(jwt);

    if (parsed && parsed.sub) {
      const jwtExists = await this.userChangePasswordRepository.get(
        parsed.sub,
        jwt,
      );

      if (jwtExists) {
        this.userRepository.writePassword(
          parsed.sub,
          await bcrypt.hash(password, await bcrypt.genSalt(10)),
        );

        await this.userChangePasswordRepository.remove(parsed.sub, jwt);
      }

      throw new Error('Authorization failed.');
    }
  }
}
