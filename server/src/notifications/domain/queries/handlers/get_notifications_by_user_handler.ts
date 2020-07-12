import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import * as mongoose from 'mongoose';

import { GetNotificationsByUserQuery } from '../impl/get_notifications_by_user_query';
import { NotificationRepository } from '../../../../notifications/domain/repositories/notification_repository';
import { NotificationProps } from '../../../../notifications/domain/models/notification_model';

@QueryHandler(GetNotificationsByUserQuery)
export class GetNotificationsByUserHandler
  implements IQueryHandler<GetNotificationsByUserQuery> {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({ id }: { id: string }): Promise<NotificationProps[]> {
    return await this.notificationRepository.getAll(id);
  }
}
