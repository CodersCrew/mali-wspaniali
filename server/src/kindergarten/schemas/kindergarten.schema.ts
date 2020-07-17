import * as mongoose from 'mongoose';

export const KindergartenSchema = new mongoose.Schema({
  city: String,
  number: String,
  name: String,
});
