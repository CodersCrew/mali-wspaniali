import { Schema, Document } from 'mongoose';
import { ChildProps } from '../domain/models/child_model';

export type ChildDocument = ChildProps & Document;

export const ChildSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  firstname: String,
  lastname: String,
  birthYear: Number,
  birthQuarter: {
    type: Number,
    default: 0,
  },
  sex: String,
  results: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  kindergarten: Schema.Types.ObjectId,
});
