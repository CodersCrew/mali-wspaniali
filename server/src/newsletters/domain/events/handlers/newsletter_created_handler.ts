import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { NewsletterCreatedEvent } from '../impl';
import { NewslettersRepository } from '../../repositories/newsletters_repository';
import { SendMail } from '../../../../shared/services/send_mail/send_mail';
import { UserRepository } from '../../../../users/domain/repositories/user_repository';

@EventsHandler(NewsletterCreatedEvent)
export class NewsletterCreatedHandler
  implements IEventHandler<NewsletterCreatedEvent> {
  constructor(
    private repository: NewslettersRepository,
    private sendMail: SendMail,
    private userRepository: UserRepository,
  ) {}

  async handle({ newsletter }: NewsletterCreatedEvent): Promise<void> {
    await this.repository.create(newsletter);

    if (newsletter.type.includes('ALL')) {
      const users = await this.userRepository.getAll({ role: 'parent' });

      await this.sendMail.send({
        from: process.env.SENDER,
        bcc: users.map(u => u.mail),
        subject: newsletter.title,
        html: this.createTemplate(newsletter.title, newsletter.message),
        text: '',
      });
    }
  }

  private createTemplate(title: string, content: string) {
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
          .container { text-align: left; color: #212121; }
          .header { background-color: #00ACC1; display: flex; justify-content: center; padding: 12px 0;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12);
          }
          .content { padding: 24px 33px; border: 1px solid #00ACC1; border-top: unset; }
          .button { text-transform: uppercase; background-color: #FF3D00; color: #fff; font-size: 14px; font-weight: 500; padding: 6px 16px; text-decoration: none; transition: background-color 0.5s; border-radius: 4px; }
          .button:hover { background-color: #B22A00 }
          .button-container { margin: 38px 0; }
          .divider { border-bottom: 1px solid #64B5F6; margin: 32px 0 24px 0 }
          .footer { display: flex; text-align: left; justify-content: space-between; }
          .links { margin-top: 12px; }
        </style>
      </head>
      <body>
      <div class="container">
        <div class="header">
          <img src="https://i.imgur.com/MsaTTCa.png" />
        </div>
        <div class="content">
          <h4>${title}</h4>
          ${content}
          <p class="caption">
          Jeśli nie podawałeś/łaś swojego adresu e-mail przy rejestracji do portalu MaliWspaniali zignoruj tę wiadomość.
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
              <div class="links">
                <a href="https://www.facebook.com/maliwspanialifundacja"><img src="https://i.imgur.com/WflVPeN.png" /></a>
                <a href="https://www.youtube.com/channel/UC8_5pq7EqIwJZNBRPtEEqwQ"><img src="https://i.imgur.com/RV9kI6n.png" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>
    `;
  }
}
