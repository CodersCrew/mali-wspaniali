import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { KeyCodeRepository } from './domain/repositories/key_code_repository';

@Injectable()
export class KeyCodesCronService {
  constructor(private readonly keyCodeRepository: KeyCodeRepository) {}
  private readonly logger = new Logger(KeyCodesCronService.name);

  @Cron('* * * * * 3')
  async handleCron(): Promise<void> {
    this.logger.log('[KeyCodes - cron] Job started');

    await this.keyCodeRepository.removeOlderThan(7);

    this.logger.log('[KeyCodes - cron] Job started');
  }
}
