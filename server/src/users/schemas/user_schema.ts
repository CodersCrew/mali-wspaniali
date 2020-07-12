import * as mongoose from 'mongoose';
import { UserProps } from '../domain/models/user_model';

export type UserDocument = UserProps & mongoose.Document;

export const UserSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  mail: String,
  password: String,
  role: {
    type: String,
    default: 'user',
  },
  children: [mongoose.Schema.Types.ObjectId],
});
