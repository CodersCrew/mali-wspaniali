import * as mongoose from 'mongoose';

export interface AggrementProps {
  date: Date;
  text: string;
}

export type AggrementDocument = AggrementProps & mongoose.Document;

export const AggrementSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  text: String,
});
