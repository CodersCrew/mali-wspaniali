import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Sendable } from '../../../shared/services/send_mail/send_mail';

@Injectable()
export class FreshmailProvider implements Sendable {
  send(options: {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
  }) {
    console.log('bbbbb');

    axios
      .post(
        `${this.getRootUrl()}/messaging/emails/`,
        {
          recipients: [
            {
              email: options.to,
              name: options.to,
            },
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
      )
      .then(e => {
        console.log(e);
      });
  }

  private createHeader() {
    return { Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}` };
  }

  private getRootUrl() {
    return 'https://api.freshmail.com/v3';
  }
}
