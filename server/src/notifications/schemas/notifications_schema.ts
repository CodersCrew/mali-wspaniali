import { Schema, Document } from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';
import { NotificationCore } from '../domain/models/notification_model';

export type NotificationDocument = NotificationCore & Document;

export const NotificationSchema = new Schema({
  ...coreSchema,
  user: String,
  templateId: String,
  values: [String],
  isRead: {
    type: Boolean,
    default: false,
  },
});
