import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Sendable } from '../../../shared/services/send_mail/send_mail';

@Injectable()
export class FreshmailProvider implements Sendable {
  send(options: {
    from: string;
    bcc: string[];
    subject: string;
    text: string;
    html: string;
  }) {
    axios.post(
      `${this.getRootUrl()}/messaging/emails/`,
      {
        recipients: [
          options.bcc.map(mail => ({
            email: mail,
            name: mail,
          })),
        ],
        from: {
          name: options.from,
          email: options.from,
        },
        subject: options.subject,

        contents: [
          {
            type: 'text/html',
            body: options.html,
          },
          {
            type: 'text/plain',
            body: options.text,
          },
        ],
      },
      { headers: this.createHeader() },
    );
  }

  private createHeader() {
    return { Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}` };
  }

  private getRootUrl() {
    return 'https://api.freshmail.com/v3';
  }
}
