import { transformAndValidateSync } from 'class-transformer-validator';
import { classToPlain } from 'class-transformer';

import { NotificationCore, Notification } from '../models/notification_model';
import { getCoreValidationConfig } from '../../../shared/utils/core_validation';

export class NotificationMapper {
  static toDomain(value: NotificationCore): Notification {
    return Notification.create(
      transformAndValidateSync(
        NotificationCore,
        value,
        getCoreValidationConfig(),
      ),
    );
  }

  static toDomainMany(values: NotificationCore[]): Notification[] {
    return values.map(NotificationMapper.toDomain);
  }

  static toPlain(value: Notification): NotificationCore {
    const props = value.getProps();

    return classToPlain(props, {
      excludeExtraneousValues: true,
    }) as NotificationCore;
  }
}
