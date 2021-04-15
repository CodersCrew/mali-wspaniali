import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ReadNotificationCommand } from '../impl';
import { NotificationRepository } from '../../repositories/notification_repository';
import { NotificationProps } from '../../models/notification_model';

@CommandHandler(ReadNotificationCommand)
export class ReadNotificationHandler
  implements ICommandHandler<ReadNotificationCommand> {
  constructor(private readonly repository: NotificationRepository) {}

  execute({ id }: ReadNotificationCommand): Promise<NotificationProps> {
    return this.repository.read(id);
  }
}
