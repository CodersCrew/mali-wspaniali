import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { ResetPasswordCommand } from '../impl';
import { UserRepository } from '../../repositories/user_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserChangePasswordRepository } from '../../repositories/user_change_password_jwt_repository';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler
  implements ICommandHandler<ResetPasswordCommand> {
  constructor(
    private userRepository: UserRepository,
    private userChangePasswordRepository: UserChangePasswordRepository,
    private jwtService: JwtService,
    private sendMail: SendMail,
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
        userId: user.id,
        jwt: payload,
      });

      this.sendMail.send({
        to: mail,
        from: 'piotrek@coderscrew.pl',
        subject: 'register',
        text: 'register',
        html: this.createTemplate(
          `${process.env.SERVER_RESPONSE_HOST}/password-change/${payload}`,
        ),
      });
    }
  }

  private createTemplate(responsePath: string) {
    return `
    <html>
      <head>
        <style>
          body { margin: 0 88px 75px 88px }

          @media only screen and (max-width: 768px) {
            body {
              margin: 0 16px 154px 16px
            }
          }

          h4 { font-weight: 500; font-size: 20px; line-height: 24px; letter-spacing: 0.15px; }
          .subtitle { font-weight: 500; font-size: 16px; line-height: 20px; letter-spacing: 0.15px; }
          .caption { font-weight: 400; font-size: 12px; line-height: 15px; letter-spacing: 0.4px; }
          .container { text-align: center; color: #212121; }
          .header { background-color: #00ACC1; display: flex; justify-content: center; padding: 12px 0;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12);
          }
          .content { padding: 24px 33px; border: 1px solid #00ACC1; border-top: unset; }
          .button { text-transform: uppercase; background-color: #FF3D00; color: #fff; font-size: 14px; font-weight: 500; padding: 6px 16px; text-decoration: none; transition: background-color 0.5s; border-radius: 4px; }
          .button:hover { background-color: #B22A00 }
          .button-container { margin: 38px 0; }
          .divider { border-bottom: 1px solid #64B5F6; margin: 32px 0 24px 0 }
          .footer { display: flex; text-align: left; justify-content: space-between; }
        </style>
      </head>
      <body>
      <div class="container">
        <div class="header">
          <img src="https://i.imgur.com/MsaTTCa.png" />
        </div>
        <div class="content">
          <h4>Dzień dobry!</h4>
          <p class="subtitle">
            Otrzymaliśmy prośbę dotyczącą zresetowania Twojego hasła na platformie Mali Wspaniali.
            </br>
            </br>
            Skorzystaj z przycisku poniżej, aby stworzyć nowe hasło do Twojego konta.
          </p>
          <div class="button-container">
            <a class="button" href="${responsePath}">stwórz nowe hasło</a>
          </div>
          <p class="caption">
            Jeśli nie rejestrowałeś/łaś się na platformie Mali Wspaniali to zignoruj tą wiadomość.
          </p>
          <div class="divider"></div>
          <div class="footer caption">
            <div class="address">
                  Fundacja Mali Wspaniali</br>
              ul. Ślężna 2 - 24, 53-302 Wrocław</br></br>
              +48 510 454 457</br>
              <a href="mailto:biuro@mali-wspaniali.pl">biuro@mali-wspaniali.pl</a>
            </div>
            <div class="contact">
              Odwiedź nas na:</br>
              <a href="https://www.facebook.com/maliwspanialifundacja"><img src="https://i.imgur.com/WflVPeN.png" /></a>
              <a href="https://www.youtube.com/channel/UC8_5pq7EqIwJZNBRPtEEqwQ"><img src="https://i.imgur.com/RV9kI6n.png" /></a>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
    `;
  }
}
