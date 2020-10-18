import * as mongoose from 'mongoose';
import { KeyCodeProps } from '../domain/models/key_code_model';

export type KeyCodeDocument = KeyCodeProps & mongoose.Document;

export const KeyCodeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: String,
  keyCode: String,
  series: String,
  target: String,
});
