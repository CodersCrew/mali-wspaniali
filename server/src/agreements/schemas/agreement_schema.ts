import * as mongoose from 'mongoose';

export interface AgreementProps {
  _id: string;
  date: Date;
  text: string;
  isOutdated: boolean;
  isSigned: boolean;
}

export type AgreementDocument = AgreementProps & mongoose.Document;

export const AgreementSchema = new mongoose.Schema({
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
