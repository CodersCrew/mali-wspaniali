import { Schema } from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';
import { RedactorSchema } from './redactor.schema';

export const ArticleSchema = new Schema({
  ...coreSchema,
  category: String,
  contentHTML: String,
  description: String,
  pictureUrl: String,
  redactor: RedactorSchema,
  title: String,
  videoUrl: String,
  isPublished: Boolean,
  publishedAt: Date,
});
