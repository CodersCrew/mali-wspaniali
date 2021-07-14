import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationRepository } from './domain/repositories/notification_repository';

@Injectable()
export class NotificationsCronService {
  constructor(private notificationRepository: NotificationRepository) {}
  private logger = new Logger(NotificationsCronService.name);

  @Cron(CronExpression.EVERY_WEEK)
  async handleCron(): Promise<void> {
    this.logger.log('[Notifications - cron] Job started');

    await this.notificationRepository.removeOlderThan(30);

    this.logger.log('[Notifications - cron] Job finished');
  }
}
