import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { CreateConfirmationRequestCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';
import { getTemplate } from '../../../../shared/services/send_mail/getTemplate';

@CommandHandler(CreateConfirmationRequestCommand)
export class CreateConfirmationRequestHandler
  implements ICommandHandler<CreateConfirmationRequestCommand> {
  constructor(
    private userRepository: UserRepository,
    private userChangePasswordRepository: UserChangePasswordRepository,
    private jwtService: JwtService,
    private sendMail: SendMail,
  ) {}

  async execute(command: CreateConfirmationRequestCommand): Promise<void> {
    const { userId } = command;

    const user = await this.userRepository.get(userId);
    if (user) {
      const payload = this.jwtService.sign(
        {
          sub: user.id,
        },
        { secret: process.env.JWT_SECRET },
      );

      await this.userChangePasswordRepository.create({
        userId: user.id,
        jwt: payload,
      });

      this.sendMail.send({
        bcc: [user.mail],
        from: process.env.SENDER,
        subject:
          'Potwierdzenie maila dzieli cię od wejścia do świata Małych Wspaniałych',
        text: 'register',
        html: this.createTemplate(
          `${process.env.SERVER_RESPONSE_HOST}/login/${payload}`,
          user.role,
        ),
      });
    }
  }

  private createTemplate(responsePath: string, role: string) {
    const greetingMessage =
      role === 'instructor'
        ? 'Już tylko jeden krok dzieli Cię od dołączenia do społeczności Małych Wspaniałych.'
        : 'Już tylko jeden krok dzieli Cię od dołączenia do społeczności świadomych rodziców.';

    return getTemplate({
      title:
        '<div style="display:flex;flex-direction:column;align-items:center">Witaj w świecie Małych Wspaniałych!</div>',
      content: `<div style="display:flex;flex-direction:column;align-items:center" ><p class="subtitle">
      ${greetingMessage}
      </br>
      </br>
      Skorzystaj z przycisku poniżej, aby potwierdzić swój adres e-mail podany przy rejestracji.
      </p>
      <div class="button-container">
        <a class="button" href="${responsePath}">Potwierdź e-mail</a>
      </div></div>`,
    });
  }
}
