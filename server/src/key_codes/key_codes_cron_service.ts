import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KeyCodeRepository } from './domain/repositories/key_codes_repository';

@Injectable()
export class KeyCodesCronService {
  constructor(private readonly keyCodeRepository: KeyCodeRepository) {}
  private readonly logger = new Logger(KeyCodesCronService.name);

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron(): Promise<void> {
    this.logger.log('[KeyCodes - cron] Job started');

    await this.keyCodeRepository.removeOlderThan(7);

    this.logger.log('[KeyCodes - cron] Job started');
  }
}
