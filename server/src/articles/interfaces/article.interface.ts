import { Document } from 'mongoose';

import { Redactor } from './redactor.interface';

export interface ArticleDocument extends Document {
  category: string;
  contentHTML: string;
  date: Date;
  description: string;
  pictureUrl: string;
  redactor: Redactor;
  title: string;
  videoUrl?: string;
}
