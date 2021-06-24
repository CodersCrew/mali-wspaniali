import { Schema, Document } from 'mongoose';

import { UserCore } from '../domain/models/user_model';
import { coreSchema } from '../../shared/utils/core_schema';

export type UserDocument = Omit<UserCore, 'children' | 'agreements'> & {
  children: String[];
  agreements: String[];
} & Document;

export const UserSchema: Schema = new Schema({
  ...coreSchema,
  mail: String,
  password: String,
  role: {
    type: String,
    default: 'parent',
  },
  children: [String],
  agreements: [String],
  isConfirmed: Boolean,
});
