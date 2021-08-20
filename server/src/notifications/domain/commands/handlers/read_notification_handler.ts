import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReadNotificationCommand } from '../impl';
import { NotificationRepository } from '../../repositories/notification_repository';
import { Notification } from '../../models/notification_model';

@CommandHandler(ReadNotificationCommand)
export class ReadNotificationHandler
  implements ICommandHandler<ReadNotificationCommand> {
  constructor(private repository: NotificationRepository) {}

  execute({ id }: ReadNotificationCommand): Promise<Notification> {
    return this.repository.read(id);
  }
}
