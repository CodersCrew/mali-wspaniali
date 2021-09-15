import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserChangePasswordRepository } from './domain/repositories/user_change_password_jwt_repository';

@Injectable()
export class UserChangePasswordCronService {
  constructor(private repository: UserChangePasswordRepository) {}
  private logger = new Logger(UserChangePasswordCronService.name);

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron(): Promise<void> {
    this.logger.log('[UserChangePassword - cron] Job started');

    await this.repository.removeOlderThan(14);

    this.logger.log('[UserChangePassword - cron] Job started');
  }
}
