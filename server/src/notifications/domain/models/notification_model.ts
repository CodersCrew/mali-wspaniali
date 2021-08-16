import { Expose, Transform } from 'class-transformer';
import { CoreModel } from '../../../shared/utils/core_model';
import { AggregateRoot } from '@nestjs/cqrs';

export interface NotificationProps {
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
  isRead?: boolean;

  @Expose()
  values: string[];
}

export class Notification extends AggregateRoot {
  constructor(private props: NotificationCore) {
    super();
  }

  getProps(): NotificationCore {
    return this.props;
  }

  get user(): string {
    return this.props.user;
  }

  get templateId(): string {
    return this.props.templateId;
  }

  static create(props: NotificationCore): Notification {
    return new Notification(props);
  }
}
