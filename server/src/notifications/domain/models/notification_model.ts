import * as mongoose from 'mongoose';

export interface NotificationProps {
  readonly _id: string;
  user: string | mongoose.Schema.Types.ObjectId;
  readonly date: Date;
  readonly templateId: string;
  readonly values: string[];
}

export interface CreateNotificationProps {
  readonly user: string | string[];
  readonly templateId: string;
  readonly values: string[];
}
