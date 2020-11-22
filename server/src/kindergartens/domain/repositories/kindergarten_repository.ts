import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KindergartenProps, Kindergarten } from '../models/kindergarten_model';
import { KindergartenDocument } from '../../schemas/kindergarten_schema';
import { CreateKindergartenInput } from '../../inputs/create_kindergarten_input';
import { EditKindergartenInput } from '../../inputs/edit_kindergarten_input';
import { KindergartenMapper } from '../mappers/kindergarten_mapper';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private readonly model: Model<KindergartenDocument>,
  ) {}

  async getAll(): Promise<KindergartenProps[]> {
    return await this.model.find({}, {}, { sort: { number: 1 } }).exec();
  }

  async get(id: string): Promise<KindergartenProps> {
    return await this.model
      .findById(id)
      .lean()
      .exec();
  }

  async getMany(ids: string[]): Promise<KindergartenProps[]> {
    return await this.model.find({ _id: ids }).exec();
  }

  async create(createKindergarten: Kindergarten): Promise<Kindergarten> {
    const createdKindergarden = new this.model(
      KindergartenMapper.toPersistant(createKindergarten),
    );

    const result = await createdKindergarden.save();

    return KindergartenMapper.toDomainFrom(result, { isNew: true });
  }

  async update(
    kindergartenId: string,
    options: EditKindergartenInput,
  ): Promise<KindergartenProps> {
    const updated = await this.model.findByIdAndUpdate(
      kindergartenId,
      options,
      { new: true },
    );

    return updated;
  }

  async removeKindergarten(kindergartenId: string): Promise<KindergartenProps> {
    return this.model.findByIdAndDelete(kindergartenId).exec();
  }

  // for e2e purpose only
  async clearTable(): Promise<void> {
    await this.model.deleteMany({});
  }
}
