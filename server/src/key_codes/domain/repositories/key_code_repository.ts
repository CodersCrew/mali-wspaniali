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
    const createdArticle = new this.keyCodeModel(createKeyCodeDTO);
    return await createdArticle.save();
  }

  async isKeyCode(keyCode: string) {
    return this.keyCodeModel
      .findOne({ keyCode })
      .exec()
      .then(keyCode => !!keyCode);
  }

  async removeOlderThan(days: number) {
    this.keyCodeModel
      .deleteMany({
        date: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
      })
      .exec();
  }

  async removeKeyCode(keyCode: string) {
    this.keyCodeModel.deleteOne({ keyCode }).exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.keyCodeModel.deleteMany({});
  }
}
