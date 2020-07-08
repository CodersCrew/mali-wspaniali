import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserProps } from '../models/user_model';
import { UserDocument } from '../../schemas/user_schema';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async get(id: string): Promise<UserProps> {
    return await this.userModel.findById(id).exec();
  }

  async getByMail(mail: string): Promise<UserProps> {
    return await this.userModel.findOne({ mail }).exec();
  }

  async create(createUserDTO: {
    mail: string;
    password: string;
  }): Promise<UserProps> {
    const createdUser = new this.userModel(createUserDTO);

    return await createdUser.save();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.userModel.deleteMany({});
  }
}
