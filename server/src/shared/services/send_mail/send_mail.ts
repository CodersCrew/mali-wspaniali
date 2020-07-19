import { Injectable } from '@nestjs/common';

import { NodemailerProvider } from './nodemailer_provider';

export interface Sendable {
  send(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ): void;
}

@Injectable()
export class SendMail {
  constructor(private readonly provider: NodemailerProvider) {}

  send(mail: string, template: string) {
    this.provider.send('kontakt@coderscrew.pl', mail, 'ffff', 'ffff', template)
  }
}
