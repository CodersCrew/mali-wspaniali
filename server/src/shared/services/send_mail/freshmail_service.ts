import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FreshmailService {
  send(v: string) {
    console.log('bbbbb');

    axios
      .post(
        `${this.getRootUrl()}/messaging/emails/`,
        {
          recipients: [
            {
              email: 'piotr.pietruszka@o2.pl',
              name: 'Example Recipient',
              personalization: {
                key1: 'value1',
                key2: 'value2',
              },
              headers: {
                'x-custom-header-1': 'Custom message header',
              },
            },
          ],
          from: {
            name: 'John Sender',
            email: 'sender@example.com',
          },
          subject: 'Message subject',
          contents: [
            {
              type: 'text/html',
              body: '<p>sample HTML</p>',
            },
            {
              type: 'text/plain',
              body: 'same text',
            },
          ],
          headers: {
            'x-custom-header-1': 'Custom message header',
            'x-custom-header-2': 'Custom message header',
          },
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
