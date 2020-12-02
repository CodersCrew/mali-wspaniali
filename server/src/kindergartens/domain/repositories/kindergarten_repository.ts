import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { KindergartenProps, Kindergarten } from '../models/kindergarten_model';
import { KindergartenDocument } from '../../schemas/kindergarten_schema';
import { KindergartenMapper } from '../mappers/kindergarten_mapper';
import { UpdatedKindergartenInput } from '../../inputs/kindergarten_input';

@Injectable()
export class KindergartenRepository {
  constructor(
    @InjectModel('Kindergarten')
    private readonly model: Model<KindergartenDocument>,
  ) {}

  getAll(): Promise<Kindergarten[]> {
    return this.model
      .find({}, {}, { sort: { number: 1 } })
      .exec()
      .then(kindergartenList => {
        return kindergartenList.map(k => KindergartenMapper.toDomainFrom(k));
      });
  }

  get(id: string): Promise<Kindergarten | null> {
    return this.model
      .findById(id)
      .lean()
      .exec()
      .then(kindergarten =>
        kindergarten ? KindergartenMapper.toDomainFrom(kindergarten) : null,
      );
  }

  getMany(ids: string[]): Promise<Kindergarten[]> {
    return this.model
      .find({
        _id: {
          $in: ids,
        },
      })
      .exec()
      .then(kindergartenList => {
        return kindergartenList.map(k => KindergartenMapper.toDomainFrom(k));
      });
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
    options: UpdatedKindergartenInput,
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
