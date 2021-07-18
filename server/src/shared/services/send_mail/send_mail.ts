import { Injectable } from '@nestjs/common';
import { FreshmailProvider } from './freshmail_service';

import { SandboxProvider } from './nodemailer_provider';

interface MailOptions {
  from: string;
  bcc: string[];
  subject: string;
  text: string;
  html: string;
}

export interface Sendable {
  send(options: MailOptions): void;
}

@Injectable()
export class SendMail {
  constructor(
    private sandboxProvider: SandboxProvider,
    private readonly freshmailService: FreshmailProvider,
  ) {}

  send(options: MailOptions): void {
    if (process.env.IS_PRODUCTION_MAIL === 'true') {
      this.freshmailService.send(options);

      return;
    }

    this.sandboxProvider.send(options);
  }
}
