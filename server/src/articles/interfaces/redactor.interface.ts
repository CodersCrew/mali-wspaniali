import { Document } from 'mongoose';

export interface Redactor extends Document {
  readonly avatarUrl?: string;
  readonly firstName: string;
  readonly lastName?: string;
  readonly profession?: string;
  readonly biography?: string;
}
