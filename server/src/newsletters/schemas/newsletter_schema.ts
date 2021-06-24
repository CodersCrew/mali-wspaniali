import * as mongoose from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';

export const NewsletterSchema = new mongoose.Schema({
  ...coreSchema,
  message: String,
  recipients: [String],
  title: String,
  type: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});
