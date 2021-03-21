import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UserProps, User } from '../models/user_model';
import { UserDocument } from '../../schemas/user_schema';
import { KeyCodeProps } from '../../../key_codes/domain/models/key_code_model';
import { ObjectId } from '../models/object_id_value_object';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async get(id: string): Promise<User> {
    return await this.userModel
      .findById(id, { password: 0 })
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
    let query: { [index: string]: string | boolean } = { deleted: false };

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
          $in: childrenIds.map(child => Types.ObjectId(child)),
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
      agreements?: string[];
    },
    keyCode: KeyCodeProps,
  ): Promise<User> {
    const user = User.recreate(createUserDTO);

    const createdUser = new this.userModel({
      ...user.getProps(),
      role: keyCode.target,
    });
    const {
      children: _children,
      _id,
      agreements: _agreements,
      ...rawUser
    }: UserDocument = await (await createdUser.save()).toObject();

    return User.create(
      {
        ...rawUser,
        _id: _id.toString(),
        children: _children.map(agreement => agreement.toString()),
        agreements: _agreements.map(agreement => agreement.toString()),
      },
      keyCode.keyCode,
    );
  }

  async addChild(childId: ObjectId, userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { children: childId.toMongoId() },
      },
      { new: true },
    );
  }

  async writePassword(userId: string, password: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { password });
  }

  async addAgreement(
    userId: string,
    agreementId: string,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, {
      $addToSet: { agreements: Types.ObjectId(agreementId) },
    });
  }

  async removeAgreement(
    userId: string,
    agreementId: string,
  ): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(userId, {
      $pull: { agreements: Types.ObjectId(agreementId) },
    });
  }

  update(
    id: string,
    { children, agreements, ...updates }: Partial<Omit<UserProps, '_id'>>,
  ) {
    const updatedChildren = children?.map(child => Types.ObjectId(child));
    const updatedAgreements = agreements?.map(agreement =>
      Types.ObjectId(agreement),
    );

    let updateObject: typeof updates & {
      children?: Types.ObjectId[];
      agreements?: Types.ObjectId[];
    } = updates;

    if (updatedChildren) {
      updateObject.children = updatedChildren;
    }

    if (updatedAgreements) {
      updateObject.agreements = updatedAgreements;
    }

    return this.userModel.findByIdAndUpdate(id, updateObject);
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

function parseUser(user: UserDocument) {
  if (user) {
    const _id = user._id.toString();
    // if admin
    const agreements = (user.agreements || []).map(agreement =>
      agreement.toString(),
    );
    const children = (user.children || []).map(child => child.toString());
    const deleted = !!user.deleted;

    return User.recreate({ ...user, _id, agreements, children, deleted });
  }
}
