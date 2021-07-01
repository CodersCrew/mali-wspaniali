import * as mongoose from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';
import { KeyCodeCore } from '../domain/models/key_code_model';

export type KeyCodeDocument = KeyCodeCore & mongoose.Document;

export const KeyCodeSchema = new mongoose.Schema({
  ...coreSchema,
  createdBy: String,
  keyCode: String,
  series: String,
  target: String,
});
