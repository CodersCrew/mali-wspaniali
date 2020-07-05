import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KeyCodeRepository } from './domain/repositories/key_code_repository';

@Injectable()
export class KeyCodeCronService {
  constructor(private readonly keyCodeRepository: KeyCodeRepository) {}
  private readonly logger = new Logger(KeyCodeCronService.name);

  @Cron('* * * * * 3')
  async handleCron(): Promise<void> {
    await this.keyCodeRepository.removeOlderThan(7);
  }
}
