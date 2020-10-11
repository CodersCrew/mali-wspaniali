import * as mongoose from 'mongoose';
import { RedactorSchema } from './redactor.schema';

export const ArticleSchema = new mongoose.Schema({
  category: String,
  contentHTML: String,
  date: {
    type: Date,
    default: Date.now,
  },
  description: String,
  header: String,
  pictureUrl: String,
  readingTime: Number,
  redactor: RedactorSchema,
  subtitle: String,
  tags: [String],
  title: String,
  videoUrl: String,
});
