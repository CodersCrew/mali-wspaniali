import { Schema } from 'mongoose';
import { RedactorSchema } from './redactor.schema';

export const ArticleSchema = new Schema({
  _id: String,
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
  isDeleted: Boolean,
  isPublished: Boolean,
  createdAt: Date,
  modifiedAt: Date,
  deletedAt: Date,
  publishedAt: Date,
});
