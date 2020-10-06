import * as mongoose from 'mongoose';

export interface AssessmentProps {
  _id: string;
  date: Date;
  title: string;
  isOutdated: boolean;
  isSigned: boolean;
}

export type AssessmentDocument = AssessmentProps & mongoose.Document;

export const AssessmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  title: String,
  isOutdated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
});
