import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserCore, User } from '../models/user_model';
import { UserDocument } from '../../schemas/user_schema';
import { KeyCode } from '../../../key_codes/domain/models/key_code_model';
import { UserMapper } from '../mappers/user_mapper';
import { UserDTO } from '../../dto/user_dto';
import { UserPagination } from '@users/params/user_pagination';

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
          isConfirmed: true,
        },
        { password: 0 },
      )
      .lean()
      .exec()
      .then(users => users.map(parseUser));
  }

  async getAll(options: UserPagination): Promise<User[]> {
    const result = this.userModel
      .aggregate([{ $project: { password: 0 } }])
      .match({
        isDeleted: {
          $in: [false, undefined],
        },
        isConfirmed: true,
      });

    if (options.search && options.search.length !== 0) {
      result.match({
        $or: [
          { mail: { $regex: options.search, $options: 'i' } },
          { firstname: { $regex: options.search, $options: 'i' } },
          { lastname: { $regex: options.search, $options: 'i' } },
        ],
      });
    }

    if (options.role) {
      result.match({ role: options.role });
    }

    if (options.kindergartenId) {
      result.lookup({
        from: 'children',
        localField: 'children',
        foreignField: '_id',
        as: 'ChildrenData',
      });

      result.match({
        'ChildrenData.kindergarten': options.kindergartenId,
      });
    }

    if (options.page) {
      result.skip(10 * parseInt(options.page, 10));
      result.limit(10);
    }

    return await result.exec().then(users => users.map(parseUser));
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
        isConfirmed: true,
      })
      .lean()
      .exec()
      .then(users => users.map(parseUser));
  }

  async forEach(cb: (user: UserDocument) => void): Promise<void> {
    await this.userModel
      .find({ isConfirmed: true })
      .cursor()
      .eachAsync(user => cb(user));
  }

  async forEachAdmin(cb: (user: UserDocument) => void): Promise<void> {
    await this.userModel
      .find({ role: 'admin', isConfirmed: true })
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
    const user = UserMapper.toDomain(
      { ...createUserDTO, role: keyCode.target },
      { keyCode: keyCode.keyCode },
    );

    const createdUser = new this.userModel(user.getProps());

    await (await createdUser.save()).toObject();

    return user;
  }

  async addChild(childId: string, userId: string): Promise<void> {
    await this.userModel.findOneAndUpdate(
      { _id: userId, isConfirmed: true },
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
    return this.userModel.findOneAndUpdate(
      { _id: id, isConfirmed: true },
      updates,
      {
        useFindAndModify: false,
      },
    );
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }

  // for e2e purpose only
  async createAdmin(mail: string, password: string): Promise<void> {
    const user = UserMapper.toDomain({
      mail,
      password,
      role: 'admin',
      isConfirmed: true,
    });

    await new this.userModel(UserMapper.toPlain(user)).save();
  }

  // for e2e purpose only
  async confirmUser(mail: string): Promise<void> {
    await this.userModel.findOneAndUpdate({ mail }, { isConfirmed: true });
  }
}

function parseUser(user: UserDocument) {
  if (user) {
    const recreatedUser = UserMapper.toDomain((user as unknown) as UserDTO);

    return recreatedUser;
  }
}
