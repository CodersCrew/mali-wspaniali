import { Schema } from 'mongoose';

export const RedactorSchema = new Schema(
  {
    avatarUrl: String,
    firstName: String,
    lastName: String,
    profession: String,
    biography: String,
  },
  { _id: false },
);
