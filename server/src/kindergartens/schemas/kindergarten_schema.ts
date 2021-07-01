import { Schema, Document } from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';
import { KindergartenCore } from '../domain/models/kindergarten_model';

export type KindergartenDocument = KindergartenCore & Document;

export const KindergartenSchema = new Schema({
  ...coreSchema,
  number: {
    type: Number,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
});
