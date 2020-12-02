import { Schema, Types, Document } from 'mongoose';

export interface KindergartenWithInstructorDocumentProps {
  kindergartenId: Types.ObjectId;
  instructorId: Types.ObjectId | null;
}

interface AssessmentDocumentProps {
  _id: Types.ObjectId;
  date: Date;
  title: string;
  isOutdated: boolean;
  isSigned: boolean;
  startDate: string;
  endDate: string;
  kindergartens: Array<KindergartenWithInstructorDocumentProps>;
}

export type AssessmentDocument = AssessmentDocumentProps & Document;

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
