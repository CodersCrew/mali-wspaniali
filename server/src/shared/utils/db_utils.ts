import * as mongoose from 'mongoose';

export function isObjectId(value): boolean {
  return mongoose.isValidObjectId(value);
}
