import * as mongoose from 'mongoose';

export const RedactorSchema = new mongoose.Schema(
  {
    avatarUrl: String,
    firstName: String,
    lastName: String,
    profession: String,
    shortDescription: String,
  },
  { _id: false },
);
