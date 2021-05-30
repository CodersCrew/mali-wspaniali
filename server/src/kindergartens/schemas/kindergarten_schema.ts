import { Schema, Document } from 'mongoose';
import { KindergartenProps } from '../domain/models/kindergarten_model';

export type KindergartenDocument = KindergartenProps & Document;

export const KindergartenSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  number: {
    type: Number,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  isDeleted: {
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
});
