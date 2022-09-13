import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { GetNotificationsByUserQuery } from '../impl/get_notifications_by_user_query';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { Notification } from '../../models/notification_model';

@QueryHandler(GetNotificationsByUserQuery)
export class GetNotificationsByUserHandler
  implements IQueryHandler<GetNotificationsByUserQuery> {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute({ id }: { id: string }): Promise<Notification[]> {
    return await this.notificationRepository.getAll(id);
  }
}
