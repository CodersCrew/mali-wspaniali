import { Document } from 'mongoose';

import { Redactor } from './redactor.interface';
import { CategoryProps } from '../domain/models/category';

export interface ArticleDocument extends Document {
  readonly category: CategoryProps;
  readonly contentHTML: string;
  readonly date: Date;
  readonly description: string;
  readonly pictureUrl: string;
  readonly readingTime: number;
  readonly redactor: Redactor;
  readonly tags: string[];
  readonly title: string;
  readonly videoUrl?: string;
}
