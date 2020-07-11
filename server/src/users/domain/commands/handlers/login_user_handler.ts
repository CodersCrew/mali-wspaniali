import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { LoginUserCommand } from '../impl/login_user_command';
import { UserRepository } from '../../repositories/user_repository';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginUserCommand): Promise<string> {
    const { mail, password } = command;

    const user = await this.userRepository.getByMail(mail);

    if (user) {
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (isValidPassword) {
        const payload = this.jwtService.sign({
          mail: user.mail,
          sub: user._id,
        });

        return payload;
      }
    }

    throw new Error('Wrong mail or password');
  }
}
