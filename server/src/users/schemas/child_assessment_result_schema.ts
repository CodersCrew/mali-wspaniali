import { Schema, Document } from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';
import { ChildAssessmentResultCore } from '../domain/models/child_assessment_result_model';

export type ChildAssessmentResultDocument = ChildAssessmentResultCore &
  Document;

export const ChildAssessmentResultSchema = new Schema({
  ...coreSchema,
  childId: String,
  kindergartenId: String,
  assessmentId: String,
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
  firstMeasurementKindergarten: String,
  lastMeasurementKindergarten: String,
});
