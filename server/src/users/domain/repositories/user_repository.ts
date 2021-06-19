import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { transformAndValidateSync } from 'class-transformer-validator';

import { UserCore, User } from '../models/user_model';
import { UserDocument } from '../../schemas/user_schema';
import { classToPlain } from 'class-transformer';
import { KeyCode } from '../../../key_codes/domain/models/key_code_model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {}

  async get(id: string): Promise<User> {
    return await this.userModel
      .findOne({ _id: id }, { password: 0 })
      .lean()
      .exec()
      .then(parseUser);
  }

  async getMany(ids: string[]): Promise<User[]> {
    return await this.userModel
      .find(
        {
          _id: {
            $in: ids,
          },
        },
        { password: 0 },
      )
      .lean()
      .exec()
      .then(users => users.map(parseUser));
  }

  async getAll(role?: string): Promise<User[]> {
    let query: { [index: string]: string | boolean | unknown } = {
      isDeleted: {
        $in: [false, undefined],
      },
    };

    if (role) {
      query.role = role;
    }

    return await this.userModel
      .find(query, { password: 0 })
      .lean()
      .exec()
      .then(users => users.map(parseUser));
  }

  async getByMail(mail: string): Promise<User> {
    return await this.userModel
      .findOne({ mail })
      .lean()
      .exec()
      .then(parseUser);
  }

  async getByChildren(childrenIds: string[]): Promise<User[]> {
    return await this.userModel
      .find({
        children: {
          $in: childrenIds,
        },
      })
      .lean()
      .exec()
      .then(users => users.map(parseUser));
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
      agreements: string[];
    },
    keyCode: KeyCode,
  ): Promise<User> {
    const user = User.create(
      transformAndValidateSync(
        UserCore,
        { ...createUserDTO, role: keyCode.target },
        {
          transformer: { excludeExtraneousValues: true },
          validator: { validationError: { target: false, value: false } },
        },
      ),
      keyCode.keyCode,
    );

    const createdUser = new this.userModel(user.getProps());

    await (await createdUser.save()).toObject();

    return user;
  }

  async addChild(childId: string, userId: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { children: childId },
      },
      { new: true, useFindAndModify: false },
    );
  }

  async writePassword(userId: string, password: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId },
      { password },
      { useFindAndModify: false },
    );
  }

  async addAgreement(
    userId: string,
    agreementId: string,
  ): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $addToSet: { agreements: agreementId },
      },
      {
        useFindAndModify: false,
      },
    );
  }

  async removeAgreement(
    userId: string,
    agreementId: string,
  ): Promise<UserDocument> {
    return this.userModel.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { agreements: agreementId },
      },
      {
        useFindAndModify: false,
      },
    );
  }

  update(id: string, updates: Partial<Omit<UserCore, '_id'>>) {
    return this.userModel.findOneAndUpdate({ _id: id }, updates, {
      useFindAndModify: false,
    });
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  // for e2e purpose only
  async createAdmin(mail: string, password: string): Promise<void> {
    const user = User.recreate(
      transformAndValidateSync(
        UserCore,
        { mail, password, role: 'admin' },
        {
          transformer: { excludeExtraneousValues: true },
          validator: { validationError: { target: false, value: false } },
        },
      ),
    );

    await new this.userModel(
      classToPlain(user.getProps(), { excludeExtraneousValues: true }),
    ).save();
  }
}

function parseUser(user: UserDocument) {
  if (user) {
    const recreatedUser = User.recreate(
      transformAndValidateSync(UserCore, user, {
        transformer: { excludeExtraneousValues: true },
        validator: { validationError: { target: false, value: false } },
      }),
    );

    return recreatedUser;
  }
}
