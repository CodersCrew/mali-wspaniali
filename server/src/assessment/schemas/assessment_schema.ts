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
  title: String,
  isOutdated: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
    default: Date.now,
  },
  startDate: String,
  endDate: String,
  kindergartenIds: {
    type: [String],
    default: [],
  },
});
