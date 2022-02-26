import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginUserCommand } from '../impl/login_user_command';
import { UserRepository } from '../../repositories/user_repository';
import { logger } from '@app/logger';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<string> {
    const { mail, password } = command;

    const user = await this.userRepository.getByMail(mail);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        if (!user.isConfirmed) {
          logger.info('Login unconfirmed account', {
            id: user.id,
            event: 'user_login_unconfirmed',
          });

          throw new Error('confirmation-failed');
        }

        logger.info('User logged', { id: user.id, event: 'user_logged' });

        const payload = this.jwtService.sign({
          role: user.role,
          mail: user.mail,
          sub: user.id,
        });

        return payload;
      }
    }

    logger.info('User login error', { event: 'user_login_error' });

    throw new Error('Wrong mail or password');
  }
}
