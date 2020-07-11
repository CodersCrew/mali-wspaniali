import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { NotificationRepository } from './domain/repositories/notification_repository';

@Injectable()
export class NotificationsCronService {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}
  private readonly logger = new Logger(NotificationsCronService.name);

  @Cron('* * * 15 * *')
  async handleCron(): Promise<void> {
    this.logger.log('[Notifications - cron] Job started');

    await this.notificationRepository.removeOlderThan(30);

    this.logger.log('[Notifications - cron] Job finished');
  }
}
