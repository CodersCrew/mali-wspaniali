import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';

import { Sendable } from './send_mail';

@Injectable()
export class NodemailerProvider implements Sendable {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  send(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ): void {
    this.transporter.sendMail({ from, to, subject, text, html });
  }
}
