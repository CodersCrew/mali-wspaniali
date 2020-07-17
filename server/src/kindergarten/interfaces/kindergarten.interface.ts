import { Document } from 'mongoose';

export interface Kindergarten extends Document {
  readonly city: string;
  readonly number: string;
  readonly name: string;
}
