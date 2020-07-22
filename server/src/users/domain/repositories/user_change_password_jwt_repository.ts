import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import {
  UserChangePasswordJWTDocument,
  UserChangePasswordJWTProps,
} from '../../schemas/user_change_password_jwt_schema';

@Injectable()
export class UserChangePasswordRepository {
  constructor(
    @InjectModel('UserChangePasswordJWT')
    private readonly model: mongoose.Model<UserChangePasswordJWTDocument>,
  ) {}

  async create(
    userChangePasswordDTO: Omit<UserChangePasswordJWTProps, '_id'>,
  ): Promise<void> {
    const createdChangePasswordJWT = new this.model(userChangePasswordDTO);

    await createdChangePasswordJWT.save();
  }

  async get(userId: string, jwt: string): Promise<UserChangePasswordJWTProps> {
    return await this.model
      .findOne({ userId, jwt })
      .lean()
      .exec();
  }

  async removeOlderThan(days: number): Promise<void> {
    this.model
      .deleteMany({
        date: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  async remove(userId: string, jwt: string): Promise<void> {
    await this.model
      .findOneAndRemove({
        userId,
        jwt,
      })
      .exec();
  }
}
