import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KeyCodeRepository } from './domain/repositories/key_codes_repository';

@Injectable()
export class KeyCodesCronService {
  constructor(private keyCodeRepository: KeyCodeRepository) {}
  private logger = new Logger(KeyCodesCronService.name);

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron(): Promise<void> {
    this.logger.log('[KeyCodes - cron] Job started');

    await this.keyCodeRepository.removeOlderThan(14);

    this.logger.log('[KeyCodes - cron] Job started');
  }
}
