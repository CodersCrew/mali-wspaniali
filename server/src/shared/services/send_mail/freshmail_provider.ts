import { Injectable } from '@nestjs/common';
import { FreshmailService } from './freshmail_service';

@Injectable()
export class FreshmailProvider {
  constructor(private readonly freshmailService: FreshmailService) {}

  async send(mail: string, template: string): Promise<void> {
    await this.freshmailService.send(mail as any);
  }
}
