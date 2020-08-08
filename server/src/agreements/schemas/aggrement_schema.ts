import * as mongoose from 'mongoose';

export interface AggrementProps {
  _id: string;
  date: Date;
  text: string;
  isOutdated: boolean;
  isSigned: boolean;
}

export type AggrementDocument = AggrementProps & mongoose.Document;

export const AggrementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  text: String,
  isOutdated: {
    type: Boolean,
    default: false,
  },
});
