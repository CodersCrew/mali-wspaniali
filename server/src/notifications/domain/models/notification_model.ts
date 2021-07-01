import { Expose, Transform } from 'class-transformer';
import { CoreModel } from '../../../shared/utils/core_model';
import { AggregateRoot } from '@nestjs/cqrs';

export interface CreateNotificationProps {
  userId: string | string[];
  templateId: string;
  values: string[];
}

export class NotificationCore extends CoreModel {
  @Expose()
  user: string;

  @Expose()
  templateId: string;

  @Expose()
  @Transform(value => value ?? false)
  isRead: boolean;

  @Expose()
  values: string[];
}

export class Notification extends AggregateRoot {}
