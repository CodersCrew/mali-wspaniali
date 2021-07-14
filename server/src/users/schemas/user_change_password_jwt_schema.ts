import * as mongoose from 'mongoose';
import { coreSchema } from '../../shared/utils/core_schema';

export type UserChangePasswordJWTDocument = UserChangePasswordJWTProps &
  mongoose.Document;

export type UserChangePasswordJWTProps = {
  _id: string;
  userId: string;
  jwt: string;
};

export const UserChangePasswordJWT = new mongoose.Schema({
  ...coreSchema,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  jwt: String,
});
