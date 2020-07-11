import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserProps, User } from '../models/user_model';
import { UserDocument } from '../../schemas/user_schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async get(id: string): Promise<UserProps> {
    return await this.userModel.findById(id, { password: 0 }).exec();
  }

  async getByMail(mail: string): Promise<UserProps> {
    return await this.userModel.findOne({ mail }).exec();
  }

  async create(
    createUserDTO: {
      mail: string;
      password: string;
    },
    keyCode: string,
  ): Promise<User> {
    const user = User.recreate(createUserDTO);

    const createdUser = new this.userModel(user.getProps());
    const rawUser = await createdUser.save();

    return User.create(rawUser, keyCode);
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
