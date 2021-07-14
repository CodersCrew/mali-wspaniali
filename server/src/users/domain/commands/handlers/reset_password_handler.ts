import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { ResetPasswordCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';
import { FreshmailProvider } from '../../../../shared/services/send_mail/freshmail_provider';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userChangePasswordRepository: UserChangePasswordRepository,
    private readonly jwtService: JwtService,
    private readonly sendMail: SendMail,
    private readonly freshmail_provider: FreshmailProvider,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const { mail } = command;

    const user = await this.userRepository.getByMail(mail);
    if (user) {
      const payload = this.jwtService.sign(
        {
          sub: user.id,
        },
        { secret: process.env.JWT_SECRET },
      );

      await this.userChangePasswordRepository.create({
        userId: user.id.toString(),
        jwt: payload,
      });

      this.freshmail_provider.send(
        mail,
        this.createTemplate(
          `${process.env.SERVER_RESPONSE_HOST}/password-change/${payload}`,
        ),
      );
    }
  }

  private createTemplate(responsePath: string) {
    return `<html><a href="${responsePath}">Click to change password</a></html>`;
  }
}
