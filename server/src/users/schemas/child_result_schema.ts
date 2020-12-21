import { Schema, Document } from 'mongoose';
import { ChildResultProps } from '../domain/models/child_result_model';

export type ChildResultDocument = ChildResultProps & Document;

export const ChildResultSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  childId: Schema.Types.ObjectId,
  type: String,
  test: Object,
  rootResultId: Schema.Types.ObjectId,
});
