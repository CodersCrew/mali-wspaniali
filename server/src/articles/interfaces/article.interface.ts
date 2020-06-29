import { Document } from 'mongoose';

import { Redactor } from './redactor.interface';

export interface Article extends Document {
  readonly category: string;
  readonly contentHTML: string;
  readonly date: Date;
  readonly description: string;
  readonly header: string;
  readonly pictureUrl: string;
  readonly readingTime: number;
  readonly redactor: Redactor;
  readonly subtitle: string;
  readonly tags: string[];
  readonly title: string;
  readonly videoUrl?: string;
}
