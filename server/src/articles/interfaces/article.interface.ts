import { Document } from 'mongoose';

import { Redactor } from './redactor.interface';

export interface ArticleDocument extends Document {
  readonly category: string;
  readonly contentHTML: string;
  readonly date: Date;
  readonly description: string;
  readonly pictureUrl: string;
  readonly redactor: Redactor;
  readonly tags: string[];
  readonly title: string;
  readonly videoUrl?: string;
}
