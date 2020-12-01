import { Schema, Document } from 'mongoose';
import { NotificationProps } from '../domain/models/notification_model';

export type NotificationDocument = NotificationProps & Document;

export const NotificationSchema = new Schema({
  user: Schema.Types.ObjectId,
  date: {
    type: Date,
    default: Date.now,
  },
  templateId: String,
  values: [String],
  isRead: {
    type: Boolean,
    default: false,
  },
});
