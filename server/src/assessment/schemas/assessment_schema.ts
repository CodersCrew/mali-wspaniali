import { Schema, Document } from 'mongoose';

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

export type AssessmentDocument = AssessmentProps & Document;

export const AssessmentSchema = new Schema({
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
        kindergartenId: Schema.Types.ObjectId,
        instructorId: {
          type: Schema.Types.ObjectId,
          default: null,
        },
      },
    ],
    default: [],
  },
});
