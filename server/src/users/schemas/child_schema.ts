import * as mongoose from 'mongoose';
import { ChildProps } from '../domain/models/child_model';

export type ChildDocument = ChildProps & mongoose.Document;

export const ChildSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  firstname: String,
  lastname: String,
  birthYear: Number,
  sex: String,
  results: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  kindergarten: mongoose.Types.ObjectId,
});
