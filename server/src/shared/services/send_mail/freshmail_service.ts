import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Sendable } from '../../../shared/services/send_mail/send_mail';

@Injectable()
export class FreshmailProvider implements Sendable {
  async send(options: {
    from: string;
    bcc: string[];
    subject: string;
    text: string;
    html: string;
  }): Promise<string[]> {
    const errors: string[] = [];
    const chunkSize = 100;

    for (let i = 0; i < options.bcc.length; i += chunkSize) {
      const chunk = options.bcc.slice(i, i + chunkSize);
      const error = await this.sendChunk({ ...options, bcc: chunk });
      errors.push(...error);
    }

    return errors;
  }

  private createHeader() {
    return { Authorization: `Bearer ${process.env.FRESHMAIL_TOKEN}` };
  }

  private getRootUrl() {
    return 'https://api.freshmail.com/v3';
  }

  private async sendChunk(options: {
    from: string;
    bcc: string[];
    subject: string;
    text: string;
    html: string;
  }): Promise<string[]> {
    const errors: string[] = [];

    await axios
      .post(
        `${this.getRootUrl()}/messaging/emails/`,
        {
          recipients: options.bcc.map(mail => ({
            email: mail,
            name: mail,
          })),
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
      .then(() => {
        console.log('Emails processed: ', options.bcc.length);
      })
      .catch(error => {
        errors.push(...error.response.data.errors);
      });

    return errors;
  }
}
