import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserChangePasswordRepository } from './domain/repositories/user_change_password_jwt_repository';

@Injectable()
export class UserChangePasswordCronService {
  constructor(private readonly repository: UserChangePasswordRepository) {}
  private readonly logger = new Logger(UserChangePasswordCronService.name);

  @Cron(CronExpression.EVERY_12_HOURS)
  async handleCron(): Promise<void> {
    this.logger.log('[UserChangePassword - cron] Job started');

    await this.repository.removeOlderThan(2);

    this.logger.log('[UserChangePassword - cron] Job started');
  }
}
