import * as mongoose from 'mongoose';
import { KindergartenProps } from '../domain/models/kindergarten_model';

export type KindergartenDocument = KindergartenProps & mongoose.Document;

export const KindergartenSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  number: Number,
  name: String,
  address: String,
  city: String,
});
