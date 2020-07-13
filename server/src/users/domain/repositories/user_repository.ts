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
    return await this.userModel
      .findById(id, { password: 0 })
      .lean()
      .exec();
  }

  async getByMail(mail: string): Promise<UserProps> {
    return await this.userModel.findOne({ mail }).exec();
  }

  async forEach(cb: (user: UserDocument) => void): Promise<void> {
    await this.userModel
      .find()
      .cursor()
      .eachAsync(user => cb(user));
  }

  async forEachAdmin(cb: (user: UserDocument) => void): Promise<void> {
    await this.userModel
      .find({ role: 'admin' })
      .cursor()
      .eachAsync(user => cb(user));
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

  async addChild(childId: string, userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { children: childId },
    });
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
