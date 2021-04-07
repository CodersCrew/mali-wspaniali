import { Schema } from 'mongoose';
import { RedactorSchema } from './redactor.schema';

export const ArticleSchema = new Schema({
  category: String,
  contentHTML: String,
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
  pictureUrl: String,
  redactor: RedactorSchema,
  tags: [String],
  title: String,
  videoUrl: String,
});
