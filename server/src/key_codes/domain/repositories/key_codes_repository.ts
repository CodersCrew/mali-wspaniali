import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KeyCodeDocument } from '../../schemas/key_codes_schema';
import { KeyCode, KeyCodeCore } from '../models/key_code_model';
import { KeyCodeMapper } from '../mappers/keycode_mapper';

@Injectable()
export class KeyCodeRepository {
  constructor(
    @InjectModel('KeyCode')
    private keyCodeModel: Model<KeyCodeDocument>,
  ) {}

  getAll(series: string): Promise<KeyCode[]> {
    return this.keyCodeModel
      .find({ series }, {}, { sort: { date: -1 } })
      .exec()
      .then(keyCodes => KeyCodeMapper.toDomainMany(keyCodes));
  }

  getAllSeries(): Promise<string[]> {
    return this.keyCodeModel.distinct('series').exec();
  }

  async getOne({
    series,
    keyCode,
  }: {
    series?: string;
    keyCode?: string;
  }): Promise<KeyCode | undefined> {
    let query;

    if (series) {
      query = { series };
    } else {
      query = { keyCode };
    }

    return this.keyCodeModel
      .findOne(query)
      .lean()
      .exec()
      .then((keyCode: KeyCodeCore | undefined) => {
        if (keyCode) return KeyCodeMapper.toDomain(keyCode);
      });
  }

  count(series: string): Promise<number> {
    return this.keyCodeModel.count({ series }).exec();
  }

  async create(keyCode: KeyCode): Promise<KeyCode> {
    const createdKeyCode = new this.keyCodeModel(
      KeyCodeMapper.toPlain(keyCode),
    );

    await createdKeyCode.save();

    return keyCode;
  }

  async createBulk(keyCodes: KeyCode[]): Promise<KeyCode[]> {
    await this.keyCodeModel.insertMany(KeyCodeMapper.toPlainMany(keyCodes));

    return keyCodes;
  }

  isKeyCode(keyCode: string): Promise<boolean> {
    return this.keyCodeModel
      .findOne({ keyCode })
      .exec()
      .then(keyCode => !!keyCode);
  }

  async removeOlderThan(days: number): Promise<void> {
    this.keyCodeModel
      .deleteMany({
        createdAt: { $lt: new Date(Date.now() - days * 24 * 60 * 60 * 1000) },
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
