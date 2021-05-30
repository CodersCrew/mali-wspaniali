import { Schema, Document, Types } from 'mongoose';
import { UserProps } from '../domain/models/user_model';

export type UserDocument = Omit<UserProps, 'children' | 'agreements'> & {
  children: Types.ObjectId[];
  agreements: Types.ObjectId[];
} & Document;

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
  deleted: {
    type: Boolean,
    default: false,
  },
});
