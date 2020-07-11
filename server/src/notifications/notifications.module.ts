import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { NotificationSchema } from './schemas/notifications_schema';
import { NotificationRepository } from './domain/repositories/notification_repository';
import { NotificationsCronService } from './notifications_cron_service';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      { name: 'Notifications', schema: NotificationSchema },
    ]),
  ],
  providers: [NotificationsCronService, NotificationRepository],
  exports: [NotificationRepository],
})
export class NotificationsModule {}
