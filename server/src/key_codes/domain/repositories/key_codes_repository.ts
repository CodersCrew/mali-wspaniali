import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KeyCodeDocument } from '../../schemas/key_codes_schema';
import { KeyCodeProps } from '../models/key_code_model';
import { KeyCodeInput } from '../../inputs/key_code_input';

@Injectable()
export class KeyCodeRepository {
  constructor(
    @InjectModel('KeyCode')
    private readonly keyCodeModel: Model<KeyCodeDocument>,
  ) {}

  async getAll(series: string): Promise<KeyCodeProps[]> {
    return await this.keyCodeModel
      .find({ series }, {}, { sort: { date: -1 } })
      .exec();
  }

  async getAllSeries(): Promise<string[]> {
    return await this.keyCodeModel.distinct('series').exec();
  }

  async getOne(series: string): Promise<KeyCodeProps> {
    return await this.keyCodeModel
      .findOne({ series })
      .lean()
      .exec();
  }

  async count(series: string): Promise<number> {
    return await this.keyCodeModel.count({ series }).exec();
  }

  async create(
    createKeyCodeDTO: KeyCodeInput,
    series: string,
    target: string,
  ): Promise<KeyCodeProps> {
    const createdKeyCode = new this.keyCodeModel({
      ...createKeyCodeDTO,
      series,
      target,
    });

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
