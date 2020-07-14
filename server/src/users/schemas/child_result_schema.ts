import * as mongoose from 'mongoose';
import { ChildResultProps } from '../domain/models/child_result_model';

export type ChildResultDocument = ChildResultProps & mongoose.Document;

export const ChildResultSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  childId: mongoose.Schema.Types.ObjectId,
  type: String,
  test: Object,
});
