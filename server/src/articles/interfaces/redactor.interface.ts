import { Document } from 'mongoose';

export interface Redactor extends Document {
  avatarUrl?: string;
  firstName: string;
  lastName?: string;
  profession?: string;
  biography?: string;
}
