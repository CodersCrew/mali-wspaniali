import { Schema, Document } from 'mongoose';
import { ChildAssessmentResultProps } from '../domain/models/child_result_model';

export type ChildAssessmentResultDocument = ChildAssessmentResultProps &
  Document;

export const ChildAssessmentResultSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  childId: Schema.Types.ObjectId,
  kindergartenId: Schema.Types.ObjectId,
  assessmentId: Schema.Types.ObjectId,
  firstMeasurementNote: String,
  lastMeasurementNote: String,
  firstMeasurementRunDate: Date,
  lastMeasurementRunDate: Date,
  firstMeasurementPendelumRunDate: Date,
  lastMeasurementPendelumRunDate: Date,
  firstMeasurementThrowDate: Date,
  lastMeasurementThrowDate: Date,
  firstMeasurementJumpDate: Date,
  lastMeasurementJumpDate: Date,
  firstMeasurementRunResult: Number,
  lastMeasurementRunResult: Number,
  firstMeasurementPendelumRunResult: Number,
  lastMeasurementPendelumRunResult: Number,
  firstMeasurementThrowResult: Number,
  lastMeasurementThrowResult: Number,
  firstMeasurementJumpResult: Number,
  lastMeasurementJumpResult: Number,
  firstMeasurementKindergarten: Schema.Types.ObjectId,
  lastMeasurementKindergarten: Schema.Types.ObjectId,
});
