import * as mongoose from 'mongoose';
import { NotificationProps } from '../domain/models/notification_model';

export type NotificationDocument = NotificationProps & mongoose.Document;

export const NotificationSchema = new mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
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
