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
      .exec()
      .then(user => ({ ...user, aggrements: user.aggrements || [] }));
  }

  async getAll(): Promise<UserProps[]> {
    return await this.userModel
      .find({}, { password: 0 })
      .lean()
      .exec()
      .then(users =>
        users.map(user => ({
          ...user,
          aggrements: user.aggrements || [],
          children: user.children || [],
        })),
      );
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

  async writePassword(userId: string, password: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { password });
  }

  async addAgreement(
    userId: string,
    aggrementId: string,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { aggrements: aggrementId },
    });
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  // for e2e purpose only
  async createAdmin(mail: string, password: string): Promise<void> {
    await new this.userModel({ mail, password, role: 'admin' }).save();
  }
}
