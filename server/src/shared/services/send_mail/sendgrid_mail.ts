import { Injectable } from '@nestjs/common';
import { SendGridProvider } from '@app/shared/services/send_mail/sendgrid_provider';

export interface SendGridSendable {
  send(data: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }): void;
}

@Injectable()
export class SendGridMail {
  constructor(private readonly provider: SendGridProvider) {}
  send(mail: string, template: string): void {
    this.provider.send({
      from: process.env.SENDGRID_SENDER,
      to: mail,
      subject: 'subject',
      text: 'text',
      html: template,
    });
  }
}
