import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KeyCodeDocument } from '../../schemas/key_codes.schema';
import { KeyCodeProps } from '../models/key_code_model';
import { KeyCodeInput } from '../../inputs/key_code_input';

@Injectable()
export class KeyCodeRepository {
  constructor(
    @InjectModel('KeyCode')
    private readonly keyCodeModel: Model<KeyCodeDocument>,
  ) {}

  async getAll(): Promise<KeyCodeProps[]> {
    return await this.keyCodeModel.find({}, {}, { sort: { date: -1 } }).exec();
  }

  async create(createKeyCodeDTO: KeyCodeInput): Promise<KeyCodeProps> {
    const createdKeyCode = new this.keyCodeModel(createKeyCodeDTO);

    return await createdKeyCode.save();
  }

  async createBulk(createKeyCodeDTO: KeyCodeInput[]): Promise<KeyCodeProps[]> {
    return this.keyCodeModel.insertMany(createKeyCodeDTO);
  }

  async isKeyCode(keyCode: string): Promise<boolean> {
    return this.keyCodeModel
      .findOne({ keyCode })
      .exec()
      .then(keyCode => !!keyCode);
  }

  async removeOlderThan(days: number): Promise<void> {
    this.keyCodeModel
      .deleteMany({
        date: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  async removeKeyCode(keyCode: string): Promise<void> {
    this.keyCodeModel.deleteOne({ keyCode }).exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.keyCodeModel.deleteMany({});
  }
}
