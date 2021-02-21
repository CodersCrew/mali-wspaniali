import { Schema, Document } from 'mongoose';
import { UserProps } from '../domain/models/user_model';

export type UserDocument = UserProps & Document;

export const UserSchema: Schema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: 'parent',
  },
  children: [Schema.Types.ObjectId],
  agreements: [Schema.Types.ObjectId],
  confirmed: {
    type: Boolean,
    default: false,
  },
});
