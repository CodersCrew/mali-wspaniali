import { SendGridService } from '@anchan828/nest-sendgrid';
import { SendGridSendable } from '@app/shared/services/send_mail/sendgrid_mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SendGridProvider implements SendGridSendable {
  constructor(private readonly sendGrid: SendGridService) {}

  async send(data: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }): Promise<void> {
    await this.sendGrid.send(data);
  }
}
