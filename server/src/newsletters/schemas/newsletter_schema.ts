import * as mongoose from 'mongoose';

export const NewsletterSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  message: String,
  recipients: [String],
  title: String,
  type: String,
  isDone: {
    type: Boolean,
    default: false,
  },
});
