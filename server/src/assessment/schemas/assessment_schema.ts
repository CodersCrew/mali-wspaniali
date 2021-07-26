import { coreSchema } from '../../shared/utils/core_schema';
import { Schema, Types, Document } from 'mongoose';
import { AssessmentCore } from '../domain/models/assessment_model';

export interface KindergartenWithInstructorDocumentProps {
  kindergartenId: Types.ObjectId;
  instructorId: Types.ObjectId | null;
}

export type AssessmentDocument = AssessmentCore & Document;

export const AssessmentSchema = new Schema({
  ...coreSchema,
  title: String,
  isOutdated: {
    type: Boolean,
    default: false,
  },
  firstMeasurementStartDate: String,
  firstMeasurementEndDate: String,
  lastMeasurementStartDate: String,
  lastMeasurementEndDate: String,
  firstMeasurementStatus: String,
  lastMeasurementStatus: String,
  kindergartens: {
    type: [
      {
        _id: false,
        kindergartenId: String,
        instructorId: {
          type: String,
          default: null,
        },
      },
    ],
    default: [],
  },
});
