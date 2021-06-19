import { Expose, Transform } from 'class-transformer';
import { CoreModel } from '../../../shared/utils/core_model';

export interface CreateNotificationProps {
  readonly userId: string | string[];
  readonly templateId: string;
  readonly values: string[];
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
