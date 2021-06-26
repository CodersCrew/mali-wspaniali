import { Schema, Document } from 'mongoose';
import { AgreementCore } from '../domain/models/agreement';
import { coreSchema } from '../../shared/utils/core_schema';

export type AgreementDocument = AgreementCore & Document;

export const AgreementSchema = new Schema({
  ...coreSchema,
  text: String,
  isOutdated: {
    type: Boolean,
    default: false,
  },
});
