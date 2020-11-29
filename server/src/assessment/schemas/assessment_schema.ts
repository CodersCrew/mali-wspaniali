import * as mongoose from 'mongoose';

interface AssessmentProps {
  _id: string;
  date: Date;
  title: string;
  isOutdated: boolean;
  isSigned: boolean;
  startDate: string;
  endDate: string;
  kindergartens: Array<{
    kindergartenId: string;
    instructorId: string | null;
  }>;
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
  kindergartens: {
    type: [
      {
        _id: false,
        kindergartenId: mongoose.Schema.Types.ObjectId,
        instructorId: {
          type: mongoose.Schema.Types.ObjectId,
          default: null,
        },
      },
    ],
    default: [],
  },
});
