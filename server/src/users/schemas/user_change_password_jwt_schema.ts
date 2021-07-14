import * as mongoose from 'mongoose';

export type UserChangePasswordJWTDocument = UserChangePasswordJWTProps &
  mongoose.Document;

export type UserChangePasswordJWTProps = {
  _id: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId | string;
  jwt: string;
};

export const UserChangePasswordJWT = new mongoose.Schema({
  _id: String,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: mongoose.Schema.Types.ObjectId,
  jwt: String,
});
