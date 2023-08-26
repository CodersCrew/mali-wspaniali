import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { KeyCodeRepository } from './domain/repositories/key_codes_repository';
import { KEY_CODE_VALID_DAYS } from '@app/shared/constants';

@Injectable()
export class KeyCodesCronService {
  constructor(private keyCodeRepository: KeyCodeRepository) {}
  private logger = new Logger(KeyCodesCronService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron(): Promise<void> {
    this.logger.log('[KeyCodes - cron] Job started');

    await this.keyCodeRepository.removeOlderThan(KEY_CODE_VALID_DAYS);

    this.logger.log('[KeyCodes - cron] Job started');
  }
}
