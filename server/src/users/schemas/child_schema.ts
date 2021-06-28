import { Schema, Document } from 'mongoose';
import { ChildCore } from '../domain/models/child_model';
import { coreSchema } from '../../shared/utils/core_schema';

export type ChildDocument = ChildCore & Document;

export const ChildSchema = new Schema({
  ...coreSchema,
  firstname: String,
  lastname: String,
  birthYear: Number,
  birthQuarter: {
    type: Number,
    default: 0,
  },
  sex: String,
  results: {
    type: [String],
    default: [],
  },
  kindergarten: String,
});
